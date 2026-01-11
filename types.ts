
export enum AppStep {
  INITIAL = 'INITIAL',
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  REFINING = 'REFINING',
  ANIMATING = 'ANIMATING',
  RESULT = 'RESULT'
}

export interface StoryPage {
  text: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface DrawingAnalysis {
  subject: string;
  characterAppearance: string;
  environment: string;
  suggestedAction: string;
  storyTitle: string;
  pages: StoryPage[];
  artistName: string;
  year: string;
  grade: string;
  age: string;
}

export interface AppState {
  step: AppStep;
  originalImage: string | null;
  analysis: DrawingAnalysis | null;
  finalVideoUrl: string | null;
  error: string | null;
}