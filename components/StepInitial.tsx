
import React from 'react';

interface StepInitialProps {
  onStart: () => void;
}

const StepInitial: React.FC<StepInitialProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-700 zoom-in-95">
      <div className="relative mb-8 group">
        <div className="w-32 h-32 bg-silver rounded-full flex items-center justify-center animate-bounce">
          <span className="text-6xl group-hover:scale-125 transition-transform cursor-default">🎨</span>
        </div>
        <div className="absolute -top-4 -right-4 bg-pacific-cyan text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
          Wow!
        </div>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
        Ready to bring your drawing to life?
      </h2>
      
      <p className="text-xl text-blue-slate mb-10 max-w-lg font-medium leading-relaxed">
        Upload a drawing — even if it's faded and crinkled — and we'll transform it into a beautiful illustrated storybook you can share.
      </p>
      
      <button 
        onClick={onStart}
        className="px-12 py-6 bg-pacific-cyan hover:bg-pacific-cyan/90 text-white rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pacific-cyan/30 border-2 border-blue-slate mb-12"
      >
        Create a Storybook
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-silver">
          <div className="text-3xl mb-3">📸</div>
          <div className="text-pacific-cyan font-bold text-lg mb-1">1. Snap a photo</div>
          <p className="text-sm text-slate-500 font-medium leading-tight">Faded, crinkled, crayon-smeared — all welcome.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-silver">
          <div className="text-3xl mb-3">✨</div>
          <div className="text-pacific-cyan font-bold text-lg mb-1">2. We find the story</div>
          <p className="text-sm text-slate-500 font-medium leading-tight">Our AI imagines a whimsical adventure.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-silver">
          <div className="text-3xl mb-3">📖</div>
          <div className="text-pacific-cyan font-bold text-lg mb-1">3. Share the magic</div>
          <p className="text-sm text-slate-500 font-medium leading-tight">Send a beautiful storybook to someone special.</p>
        </div>
      </div>
    </div>
  );
};

export default StepInitial;
