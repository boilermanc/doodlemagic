
import React, { useState, useEffect } from 'react';
import { AppStep, AppState, DrawingAnalysis } from './types';
import { analyzeDrawing, generateAnimation, generateStoryImage } from './services/geminiService';
import Header from './components/Header';
import StepInitial from './components/StepInitial';
import StepUpload from './components/StepUpload';
import StepRefining from './components/StepRefining';
import StepProcessing from './components/StepProcessing';
import StepResult from './components/StepResult';
import Storybook from './components/Storybook';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    // Added readonly modifier to ensure consistency with global environment declarations
    readonly aistudio: AIStudio;
  }
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: AppStep.INITIAL,
    originalImage: null,
    analysis: null,
    finalVideoUrl: null,
    error: null
  });

  const [loadingText, setLoadingText] = useState('Thinking...');
  const [showStorybook, setShowStorybook] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const handleStart = async () => {
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
      setState(prev => ({ ...prev, step: AppStep.UPLOAD }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Magic key needed!' }));
    }
  };

  const handleImageSelected = async (base64: string) => {
    setState(prev => ({ ...prev, step: AppStep.ANALYZING, originalImage: base64 }));
    setLoadingText('Reading your magic art...');
    
    try {
      const result = await analyzeDrawing(base64);
      setState(prev => ({ ...prev, step: AppStep.REFINING, analysis: result }));
    } catch (err: any) {
      setState(prev => ({ ...prev, step: AppStep.UPLOAD, error: 'Magic failed! Try a clearer photo.' }));
    }
  };

  const handleStartAnimation = async (refinedAnalysis: DrawingAnalysis) => {
    if (!state.originalImage) return;
    setState(prev => ({ ...prev, step: AppStep.ANIMATING, analysis: refinedAnalysis }));
    
    try {
      const videoUrl = await generateAnimation(
        state.originalImage, 
        refinedAnalysis,
        (status) => setLoadingText(status)
      );
      
      setState(prev => ({ ...prev, step: AppStep.RESULT, finalVideoUrl: videoUrl }));
      
      // Start generating story images in background
      setIsGeneratingStory(true);
      const pagesWithImages = await Promise.all(
        refinedAnalysis.pages.map(async (page) => ({
          ...page,
          imageUrl: await generateStoryImage(
            state.originalImage!, 
            refinedAnalysis.characterAppearance, 
            page.imagePrompt
          )
        }))
      );
      
      setState(prev => ({
        ...prev,
        analysis: prev.analysis ? { ...prev.analysis, pages: pagesWithImages } : null
      }));
      setIsGeneratingStory(false);
      
    } catch (err: any) {
      // If the request fails with an error message containing "Requested entity was not found.",
      // reset the key selection state and prompt the user to select a key again via openSelectKey().
      if (err.message?.includes("Requested entity was not found")) {
        await window.aistudio.openSelectKey();
        setState(prev => ({ ...prev, step: AppStep.REFINING }));
      } else {
        setState(prev => ({ ...prev, step: AppStep.REFINING, error: 'Oops! Magic broke. Try again!' }));
      }
      setIsGeneratingStory(false);
    }
  };

  const handleReset = () => {
    setState({
      step: AppStep.INITIAL,
      originalImage: null,
      analysis: null,
      finalVideoUrl: null,
      error: null
    });
    setShowStorybook(false);
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 relative ${showStorybook ? 'overflow-hidden' : 'pb-20 sm:pb-8'}`}>
      {/* Universal Background Blooms */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Main UI - Only visible when book is closed */}
      {!showStorybook && (
        <>
          <Header onLogoClick={handleReset} />
          <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
            {state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center justify-between shadow-sm">
                <span>{state.error}</span>
                <button onClick={() => setState(p => ({...p, error: null}))} className="text-red-800 font-bold px-2">✕</button>
              </div>
            )}

            {state.step === AppStep.INITIAL && <StepInitial onStart={handleStart} />}
            {state.step === AppStep.UPLOAD && <StepUpload onImageSelected={handleImageSelected} />}
            {(state.step === AppStep.ANALYZING || state.step === AppStep.ANIMATING) && (
              <StepProcessing text={loadingText} originalImage={state.originalImage} isAnimating={state.step === AppStep.ANIMATING} />
            )}
            {state.step === AppStep.REFINING && state.analysis && (
              <StepRefining analysis={state.analysis} onConfirm={handleStartAnimation} originalImage={state.originalImage} />
            )}
            {state.step === AppStep.RESULT && state.finalVideoUrl && (
              <StepResult 
                videoUrl={state.finalVideoUrl} 
                onReset={handleReset} 
                analysis={state.analysis}
                onOpenStory={() => setShowStorybook(true)}
                isStoryLoading={isGeneratingStory}
              />
            )}
          </main>
        </>
      )}

      {/* Fullscreen Storybook Overlay */}
      {showStorybook && state.analysis && state.finalVideoUrl && (
        <Storybook 
          analysis={state.analysis} 
          videoUrl={state.finalVideoUrl}
          onClose={() => setShowStorybook(false)}
        />
      )}
    </div>
  );
};

export default App;
