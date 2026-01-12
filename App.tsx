
import React, { useState } from 'react';
import { AppStep, AppState, DrawingAnalysis } from './types';
import { analyzeDrawing, generateAnimation, generateStoryImage } from './services/geminiService';
import { hasApiKey } from './services/apiKeyService';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import StepInitial from './components/StepInitial';
import StepUpload from './components/StepUpload';
import StepRefining from './components/StepRefining';
import StepProcessing from './components/StepProcessing';
import StepResult from './components/StepResult';
import Storybook from './components/Storybook';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
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

  const handleStart = () => {
    setShowLanding(false);
    // Check if API key is available (dev-only check)
    if (!hasApiKey()) {
      setState(prev => ({ 
        ...prev, 
        error: 'GEMINI_API_KEY not found. Please set it in your .env.local file. See .env.example for details.' 
      }));
      return;
    }
    setState(prev => ({ ...prev, step: AppStep.UPLOAD, error: null }));
  };

  const handleImageSelected = async (base64: string) => {
    setState(prev => ({ ...prev, step: AppStep.ANALYZING, originalImage: base64 }));
    setLoadingText('Discovering the story in your drawing...');
    
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
      // Handle API key errors (dev-friendly message)
      if (err.message?.includes("Magic key needed") || 
          err.message?.includes("API key") ||
          err.message?.includes("Requested entity was not found")) {
        setState(prev => ({ 
          ...prev, 
          step: AppStep.REFINING, 
          error: 'API key error. Check your GEMINI_API_KEY in .env.local' 
        }));
      } else {
        setState(prev => ({ ...prev, step: AppStep.REFINING, error: 'Something went wrong. Please try again!' }));
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
    <div className={`min-h-screen bg-off-white text-slate-900 relative ${showStorybook ? 'overflow-hidden' : 'pb-20 sm:pb-8'}`}>
      {/* Universal Background Blooms - Warm, nostalgic colors */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pacific-cyan/30 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pacific-cyan/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Main UI - Only visible when book is closed */}
      {!showStorybook && (
        <>
          <Header onLogoClick={handleReset} />
          <main className="max-w-6xl mx-auto px-4 pt-24 pb-8 relative z-10">
            {state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center justify-between shadow-sm">
                <span>{state.error}</span>
                <button onClick={() => setState(p => ({...p, error: null}))} className="text-red-800 font-bold px-2">✕</button>
              </div>
            )}

            {showLanding && <LandingPage onStart={handleStart} />}
            {!showLanding && state.step === AppStep.UPLOAD && <StepUpload onImageSelected={handleImageSelected} />}
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
