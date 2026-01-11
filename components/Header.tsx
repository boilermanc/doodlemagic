
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-pink-100 px-6 py-4 flex items-center justify-between">
      <div 
        onClick={onLogoClick}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Doodle<span className="text-orange-500">Magic</span> ✨
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold hidden sm:block">
          For Kids & Dreamers
        </div>
      </div>
    </header>
  );
};

export default Header;
