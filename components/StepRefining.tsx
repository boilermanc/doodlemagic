
import React, { useState } from 'react';
import { DrawingAnalysis } from '../types';

interface StepRefiningProps {
  analysis: DrawingAnalysis;
  originalImage: string | null;
  onConfirm: (refined: DrawingAnalysis) => void;
}

const StepRefining: React.FC<StepRefiningProps> = ({ analysis, originalImage, onConfirm }) => {
  const [refined, setRefined] = useState<DrawingAnalysis>({ ...analysis });

  const handleChange = (field: keyof DrawingAnalysis, value: string) => {
    setRefined(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="space-y-6 order-2 md:order-1">
        <div className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-black uppercase tracking-widest">
          Story Time! 📖
        </div>
        <h2 className="text-3xl font-black text-slate-800">What's the Story?</h2>
        <p className="text-slate-600 font-medium">We think this looks like a magical scene! You can change the words below if you want.</p>
        
        <div className="space-y-5">
          {/* Artist Metadata Section */}
          <div className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 space-y-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">About the Artist</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-black text-slate-600 mb-1 block">Art By:</label>
                <input 
                  type="text" 
                  value={refined.artistName}
                  onChange={(e) => handleChange('artistName', e.target.value)}
                  className="w-full p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 outline-none transition-all font-bold text-slate-700 text-sm"
                  placeholder="Artist's Name"
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-600 mb-1 block">Age:</label>
                <input 
                  type="text" 
                  value={refined.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="w-full p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 outline-none transition-all font-bold text-slate-700 text-sm"
                  placeholder="e.g. 7"
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-600 mb-1 block">Grade:</label>
                <input 
                  type="text" 
                  value={refined.grade}
                  onChange={(e) => handleChange('grade', e.target.value)}
                  className="w-full p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 outline-none transition-all font-bold text-slate-700 text-sm"
                  placeholder="e.g. 2nd"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-black text-slate-600 mb-1 block">Year:</label>
                <input 
                  type="text" 
                  value={refined.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full p-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 outline-none transition-all font-bold text-slate-700 text-sm"
                  placeholder={new Date().getFullYear().toString()}
                />
              </div>
            </div>
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-2">
              <span className="text-xl">👤</span> Who is this?
            </label>
            <input 
              type="text" 
              value={refined.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full p-4 bg-white border-4 border-slate-100 rounded-2xl focus:border-blue-400 outline-none transition-all shadow-sm font-bold text-slate-700"
              placeholder="e.g. A happy dinosaur"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-2">
              <span className="text-xl">💃</span> What are they doing?
            </label>
            <input 
              type="text" 
              value={refined.suggestedAction}
              onChange={(e) => handleChange('suggestedAction', e.target.value)}
              className="w-full p-4 bg-white border-4 border-slate-100 rounded-2xl focus:border-pink-400 outline-none transition-all shadow-sm font-bold text-slate-700"
              placeholder="e.g. Dancing in the rain"
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-2">
              <span className="text-xl">🌍</span> Where are they?
            </label>
            <textarea 
              rows={2}
              value={refined.environment}
              onChange={(e) => handleChange('environment', e.target.value)}
              className="w-full p-4 bg-white border-4 border-slate-100 rounded-2xl focus:border-orange-400 outline-none transition-all shadow-sm font-bold text-slate-700 resize-none"
              placeholder="e.g. A candy land with chocolate rivers"
            />
          </div>
        </div>

        <button 
          onClick={() => onConfirm(refined)}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-xl shadow-blue-200 border-b-8 border-blue-800 flex items-center justify-center gap-3 group"
        >
          START THE MOVIE! 🎬
          <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
        </button>
      </div>

      <div className="flex flex-col items-center order-1 md:order-2">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Your Masterpiece</h3>
        <div className="relative group w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all"></div>
          <img 
            src={originalImage || ''} 
            alt="Original" 
            className="relative w-full aspect-square object-contain bg-white rounded-[2.5rem] border-8 border-white p-6 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default StepRefining;