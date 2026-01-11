
import React from 'react';

interface StepInitialProps {
  onStart: () => void;
}

const StepInitial: React.FC<StepInitialProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-700 zoom-in-95">
      <div className="relative mb-8 group">
        <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-6xl group-hover:scale-125 transition-transform cursor-default">🎨</span>
        </div>
        <div className="absolute -top-4 -right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
          Wow!
        </div>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
        Make Your Art <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">Come to Life! 🚀</span>
      </h2>
      
      <p className="text-xl text-slate-600 mb-10 max-w-lg font-medium leading-relaxed">
        Ready to see your drawing move and groove? Snap a photo and let's turn it into a 3D movie!
      </p>
      
      <button 
        onClick={onStart}
        className="px-12 py-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-3xl font-black text-2xl hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-orange-200 border-b-8 border-orange-700 mb-12"
      >
        START MAGIC! ✨
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="p-6 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border-4 border-blue-50 relative">
          <div className="text-3xl mb-3">📸</div>
          <div className="text-blue-500 font-black text-lg mb-1">1. Take Photo</div>
          <p className="text-sm text-slate-500 font-medium leading-tight">Show us your beautiful drawing!</p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border-4 border-purple-50">
          <div className="text-3xl mb-3">💭</div>
          <div className="text-purple-500 font-black text-lg mb-1">2. Tell Story</div>
          <p className="text-sm text-slate-500 font-medium leading-tight">Where is your character going?</p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border-4 border-pink-50">
          <div className="text-3xl mb-3">🎬</div>
          <div className="text-pink-500 font-black text-lg mb-1">3. Watch Movie</div>
          <p className="text-sm text-slate-500 font-medium leading-tight">See your art dance in 3D!</p>
        </div>
      </div>
    </div>
  );
};

export default StepInitial;
