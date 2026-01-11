
import React from 'react';

interface StepUploadProps {
  onImageSelected: (base64: string) => void;
}

const StepUpload: React.FC<StepUploadProps> = ({ onImageSelected }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="py-8 animate-in fade-in zoom-in duration-500">
      <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">Open the Magic Box! 🎁</h2>
      <p className="text-slate-500 text-center mb-8 font-medium">Click below to show us your art!</p>
      
      <div className="max-w-lg mx-auto">
        <label className="group relative flex flex-col items-center justify-center w-full h-80 border-8 border-dashed border-blue-100 rounded-[3rem] cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all bg-white overflow-hidden shadow-2xl">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform shadow-inner">
               <span className="text-5xl">📷</span>
            </div>
            <p className="mb-2 text-xl text-slate-800 font-black uppercase tracking-wider">TAP HERE</p>
            <p className="text-sm text-slate-500 text-center font-bold">TO SNAP OR PICK ART</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </label>

        <div className="mt-10 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[2rem] border-2 border-orange-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-4xl opacity-20 rotate-12">💡</div>
          <div className="flex items-start gap-4">
            <div className="text-3xl">✨</div>
            <div>
              <p className="text-sm font-black text-orange-800 mb-1">Artist Tip:</p>
              <p className="text-xs text-orange-700 leading-relaxed font-bold">
                Draw on plain white paper with dark markers for the most magical 3D movies!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUpload;
