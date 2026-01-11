
import { GoogleGenAI, Type } from "@google/genai";
import { DrawingAnalysis, StoryPage } from "../types";

// Helper to strip base64 prefix
const getBase64Data = (base64: string) => {
  return base64.split(',')[1];
};

export const analyzeDrawing = async (base64Image: string): Promise<DrawingAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: getBase64Data(base64Image),
          },
        },
        {
          text: "You are a world-class children's storyteller. Analyze this drawing. 1. Identify the subject. 2. Create a very detailed 'characterAppearance' description (colors, shapes, key features) that an artist can use to keep the character consistent. 3. Imagine a whimsical 3D environment. 4. Suggest a fun action. 5. Write an epic 10-page whimsical adventure story for a picture book. Each page should have a 'text' (1-2 simple, engaging sentences for a child) and an 'imagePrompt' (a detailed description of a specific story moment). 6. Look closely at the paper: if you see a name, age, or date written by the child, fill 'artistName', 'age', and 'year'. If not found, leave them blank. Output in JSON format.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING },
          characterAppearance: { type: Type.STRING },
          environment: { type: Type.STRING },
          suggestedAction: { type: Type.STRING },
          storyTitle: { type: Type.STRING },
          artistName: { type: Type.STRING },
          year: { type: Type.STRING },
          grade: { type: Type.STRING },
          age: { type: Type.STRING },
          pages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                imagePrompt: { type: Type.STRING }
              },
              required: ["text", "imagePrompt"]
            }
          }
        },
        required: ["subject", "characterAppearance", "environment", "suggestedAction", "storyTitle", "pages", "artistName", "year", "grade", "age"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("The magic brush ran out of paint! Try again.");
  return JSON.parse(text.trim());
};

export const generateStoryImage = async (
  originalBase64: string,
  characterDescription: string,
  pagePrompt: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-flash-image';

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: getBase64Data(originalBase64),
          },
        },
        {
          text: `Using the character from this reference image (described as: ${characterDescription}), create a consistent high-quality 3D Pixar-style illustration for a children's book. The character should look EXACTLY like the reference but in this new situation: ${pagePrompt}. Vivid colors, cinematic lighting, 8k resolution.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "4:3",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Could not create magic picture.");
};

export const generateAnimation = async (
  base64Image: string,
  analysis: DrawingAnalysis,
  onStatusUpdate?: (status: string) => void
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'veo-3.1-fast-generate-preview';

  const prompt = `A magical, high-quality 3D cinematic animation in the style of a modern animated movie. The character ${analysis.subject} (Visual features: ${analysis.characterAppearance}) comes to life and is ${analysis.suggestedAction} in a vibrant ${analysis.environment}. Professional 3D lighting, smooth motion.`;

  onStatusUpdate?.("Waking up the magic... ✨");
  
  let operation = await ai.models.generateVideos({
    model,
    prompt,
    image: {
      imageBytes: getBase64Data(base64Image),
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  onStatusUpdate?.("Painting the world... 🎨");

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 8000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("The magic portal closed! Try again.");

  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};