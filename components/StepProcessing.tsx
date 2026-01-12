
import React, { useEffect, useState, useMemo } from 'react';

interface StepProcessingProps {
  text: string;
  originalImage: string | null;
  isAnimating?: boolean;
}

const ALL_MESSAGES = [
  "Reading the lines and colors...",
  "Finding the story hidden in the crayon...",
  "Turning memories into once upon a time...",
  "Imagining where this adventure might go...",
  "Discovering the magic in every stroke...",
  "Bringing their imagination back to life...",
  "Weaving a tale from paper and dreams...",
  "Dusting off the years with care...",
  "Honoring every scribble and line...",
  "Painting a new chapter from the old...",
  "Letting the colors tell their story...",
  "Remembering when this was brand new...",
  "Turning crayon strokes into characters...",
  "Building a world from their imagination...",
  "Finding the heart of the drawing...",
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Fixed: Removed the buggy destructuring line that caused an indexing error with generic type T.
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

const StepProcessing: React.FC<StepProcessingProps> = ({ text, originalImage, isAnimating }) => {
  // Use useMemo to ensure the shuffle only happens when the component mounts or when animation starts
  const shuffledPool = useMemo(() => shuffleArray(ALL_MESSAGES), [isAnimating]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
          // If we somehow reach the end (unlikely given the message count), stay at the last one
          if (prev >= shuffledPool.length - 1) return prev;
          return prev + 1;
        });
      }, 4000); // 4 seconds gives kids time to read the message
      return () => clearInterval(interval);
    }
  }, [isAnimating, shuffledPool.length]);

  return (
    <div className="flex flex-col items-center py-12 animate-in fade-in duration-300">
      <div className="relative mb-12">
        {/* Magic Spinner */}
        <div className="w-48 h-48 border-[10px] border-slate-100 border-t-soft-gold border-r-pacific-cyan border-b-silver border-l-blue-slate rounded-full animate-spin"></div>
        <div className="absolute inset-4 overflow-hidden rounded-full flex items-center justify-center bg-white border-4 border-slate-50 shadow-inner">
          <img 
            src={originalImage || ''} 
            alt="Original" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Scanning Line */}
          {!isAnimating && (
             <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
          )}
        </div>
        {/* Floating Emotive Elements */}
        {isAnimating && (
           <>
            <div className="absolute -top-4 -left-4 text-4xl animate-bounce">📜</div>
            <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce animation-delay-2000">✨</div>
           </>
        )}
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 text-center px-4 min-h-[4rem] flex items-center justify-center">
        {isAnimating ? shuffledPool[currentIndex] : "Discovering the story in your drawing... 📖"}
      </h3>
      
      <p className="text-blue-slate font-bold text-center max-w-sm px-6">
        {isAnimating 
          ? "We're creating every page of your storybook. Each story is one-of-a-kind!" 
          : "We're looking at your drawing to discover the story waiting inside."}
      </p>

      {isAnimating && (
        <div className="mt-10 w-full max-w-sm h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
          <div className="h-full bg-gradient-to-r from-orange-400 to-pink-500 animate-[progress_40s_ease-in-out_infinite] w-0 rounded-full"></div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0%, 100% { top: 10% }
          50% { top: 90% }
        }
        @keyframes progress {
          0% { width: 0% }
          20% { width: 30% }
          50% { width: 60% }
          80% { width: 85% }
          100% { width: 95% }
        }
      `}</style>
    </div>
  );
};

export default StepProcessing;
