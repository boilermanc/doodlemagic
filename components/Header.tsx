
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-off-white border-b border-silver px-6 py-4 flex items-center justify-between">
      <div 
        onClick={onLogoClick}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-pacific-cyan rounded-full flex items-center justify-center text-white shadow-lg shadow-pacific-cyan/30 group-hover:rotate-12 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Once Upon a <span className="text-amber-500">Drawing</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-1.5 bg-gradient-to-r from-pacific-cyan to-blue-slate text-white rounded-full text-xs font-semibold hidden sm:block shadow-md shadow-pacific-cyan/20">
          Every scribble has a story
        </div>
      </div>
    </header>
  );
};

export default Header;
