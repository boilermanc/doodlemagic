
import React, { useState, useEffect, useCallback } from 'react';
import { DrawingAnalysis } from '../types';

interface StorybookProps {
  analysis: DrawingAnalysis;
  videoUrl: string;
  onClose: () => void;
}

const SFX = {
  PAGE_FLIP: 'https://assets.mixkit.co/sfx/preview/mixkit-paper-slide-1530.mp3',
  BOOK_CLOSE: 'https://assets.mixkit.co/sfx/preview/mixkit-closing-a-book-1064.mp3',
  MAGIC_OPEN: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-whoosh-2350.mp3',
  CLICK: 'https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3',
  CHEER: 'https://assets.mixkit.co/sfx/preview/mixkit-small-group-cheer-and-applause-518.mp3'
};

const Storybook: React.FC<StorybookProps> = ({ analysis, videoUrl, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const [isTurning, setIsTurning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [hasCompletedReading, setHasCompletedReading] = useState(false);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [highestPageReached, setHighestPageReached] = useState(0);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);

  const playSound = useCallback((url: string, volume: number = 0.5) => {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(e => console.debug('Audio playback blocked until interaction:', e));
  }, []);

  useEffect(() => {
    playSound(SFX.MAGIC_OPEN, 0.4);
  }, [playSound]);

  useEffect(() => {
    if (showUnlockCelebration) {
      const timer = setTimeout(() => {
        setShowUnlockCelebration(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showUnlockCelebration]);

  // Auto-hide keyboard hint after a few seconds
  useEffect(() => {
    if (showKeyboardHint) {
      const timer = setTimeout(() => {
        setShowKeyboardHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showKeyboardHint]);

  const totalSpreads = analysis.pages.length + 2;

  const handleNext = useCallback(() => {
    if (currentPage < totalSpreads - 1 && !isTurning) {
      playSound(SFX.PAGE_FLIP, 0.6);
      setDirection('next');
      setIsTurning(true);
      const nextPage = currentPage + 1;
      if (currentPage === totalSpreads - 2) {
        setTimeout(() => playSound(SFX.CHEER, 0.4), 400);
        // User reached final page by clicking next - unlock sharing
        setTimeout(() => {
          setHasCompletedReading(true);
          setShowUnlockCelebration(true);
        }, 600);
      }
      setTimeout(() => {
        setCurrentPage(prev => {
          const newPage = prev + 1;
          // Update highest page reached if we've gone further
          setHighestPageReached(currentHighest => Math.max(currentHighest, newPage));
          return newPage;
        });
        setIsTurning(false);
      }, 600);
    }
  }, [currentPage, totalSpreads, isTurning, playSound]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0 && !isTurning) {
      playSound(SFX.PAGE_FLIP, 0.6);
      setDirection('prev');
      setIsTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsTurning(false);
      }, 600);
    }
  }, [currentPage, isTurning, playSound]);

  const handleClose = useCallback(() => {
    playSound(SFX.BOOK_CLOSE, 0.7);
    setTimeout(onClose, 200);
  }, [playSound, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keys if we're in the middle of a page turn
      if (isTurning) {
        return;
      }

      // Hide keyboard hint on first key press
      if (showKeyboardHint) {
        setShowKeyboardHint(false);
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTurning, showKeyboardHint, handleNext, handlePrev, handleClose]);

  const handleIndicatorClick = (idx: number) => {
    // Allow clicking if reading is completed OR if the page has been visited
    const canClick = hasCompletedReading || idx <= highestPageReached;
    if (!canClick) {
      return; // Disable clicking pages that haven't been visited yet
    }
    if (!isTurning && idx !== currentPage) {
      playSound(SFX.CLICK, 0.3);
      setCurrentPage(idx);
    }
  };

  const getShareUrl = () => {
    try {
      const url = new URL(window.location.href);
      return url.protocol.startsWith('http') ? url.toString() : 'https://doodlemagic.app';
    } catch (e) {
      return 'https://doodlemagic.app';
    }
  };

  const handleSocialShare = (platform: 'x' | 'facebook') => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check out this beautiful story I made! It's called "${analysis.storyTitle}".`);
    
    const links = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    
    window.open(links[platform], '_blank', 'width=600,height=400');
  };

  const handleShare = async () => {
    const url = getShareUrl();
    const shareData = {
      title: `Story: ${analysis.storyTitle}`,
      text: `Check out this magical story I made with my drawing! It's called "${analysis.storyTitle}". Starring ${analysis.subject}!`,
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.error('Error sharing via navigator.share:', err);
      }
    }
    
    try {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert("Story link copied to clipboard! You can now paste it anywhere.");
    } catch (e) {
      window.open(`mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + " " + shareData.url)}`);
    }
  };

  const handleSave = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `${analysis.storyTitle.replace(/\s+/g, '-').toLowerCase()}-movie.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-700 overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gunmetal via-blue-slate to-gunmetal"></div>
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-pacific-cyan/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-soft-gold/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Top Toolbar */}
      <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-[110]">
        <div className="flex gap-3 items-center relative">
          {hasCompletedReading ? (
            <>
              <button 
                onClick={() => handleSocialShare('x')}
                className={`w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center text-xl transition-all backdrop-blur-xl border border-white/20 hover:scale-110 active:scale-90 shadow-2xl ${
                  showUnlockCelebration ? 'animate-in zoom-in fade-in duration-500' : ''
                }`}
                title="Share on X"
              >
                𝕏
              </button>
              <button 
                onClick={() => handleSocialShare('facebook')}
                className={`w-12 h-12 md:w-14 md:h-14 bg-[#1877F2] text-white rounded-full flex items-center justify-center text-2xl transition-all backdrop-blur-xl border border-white/20 hover:scale-110 active:scale-90 shadow-2xl ${
                  showUnlockCelebration ? 'animate-in zoom-in fade-in duration-500 delay-100' : ''
                }`}
                title="Share on Facebook"
              >
                f
              </button>
              {showUnlockCelebration && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full text-sm md:text-base font-black shadow-2xl whitespace-nowrap flex items-center gap-2">
                    <span>Sharing Unlocked!</span>
                    <span className="animate-bounce">🎉</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md text-white/70 rounded-full text-xs md:text-sm font-medium shadow-lg border border-white/10 flex items-center gap-2 animate-[pulse_3s_ease-in-out_infinite]">
              <span className="text-base">📤</span>
              <span className="hidden sm:inline">Finish reading to share!</span>
              <span className="sm:hidden">Share unlocks at the end</span>
            </div>
          )}
        </div>

        <button 
          onClick={handleClose}
          className="w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-3xl transition-all backdrop-blur-xl border border-white/20 hover:scale-110 active:scale-90 shadow-2xl"
        >
          ✕
        </button>
      </div>

      <div className="relative w-full h-full max-w-[95vw] max-h-[80vh] md:max-w-[1200px] lg:max-w-[1400px] md:max-h-[800px] perspective-2000 flex items-center justify-center">
        {/* Book Container */}
        <div className={`relative w-full h-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] book-shadow overflow-hidden flex flex-col md:flex-row preserve-3d transition-transform duration-700 ${isTurning ? 'scale-[0.98]' : 'scale-100'}`}>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200/50 z-50 hidden md:block"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 spine-shadow z-40 hidden md:block"></div>

          {/* LEFT PAGE: Illustration */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-slate-100 page-gradient">
            <div key={`left-${currentPage}`} className="w-full h-full animate-in fade-in zoom-in-105 duration-1000">
              {currentPage === 0 || currentPage === totalSpreads - 1 ? (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full">
                  {analysis.pages[currentPage - 1].imageUrl ? (
                    <img 
                      src={analysis.pages[currentPage - 1].imageUrl} 
                      className="w-full h-full object-cover shadow-inner"
                      alt="Story illustration"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-400 gap-4">
                      <div className="w-12 h-12 border-4 border-soft-gold border-t-transparent animate-spin rounded-full"></div>
                      <p className="font-black uppercase tracking-widest text-xs">Generating Story...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>
          </div>

          {/* RIGHT PAGE: Content */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-[#fffdf9] p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center items-center text-center">
             <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
             <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/5 to-transparent pointer-events-none"></div>

             <div key={`right-${currentPage}`} className="z-10 w-full animate-in fade-in slide-in-from-right-8 duration-700 px-4 md:px-0">
                {currentPage === 0 ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-2">
                      Your Epic Adventure
                    </div>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                      {analysis.storyTitle}
                    </h1>
                    <div className="h-1.5 w-20 md:w-24 bg-soft-gold mx-auto rounded-full"></div>
                    <div className="space-y-2 pt-4">
                      <p className="text-lg md:text-2xl text-slate-500 font-bold italic">
                        Starring the amazing <span className="text-slate-800 not-italic font-black border-b-4 border-yellow-300">{analysis.subject}</span>
                      </p>
                      {analysis.artistName && (
                        <div className="mt-4 md:mt-8 p-4 md:p-6 border-2 border-slate-100 rounded-3xl bg-slate-50/50 backdrop-blur-sm">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Original Artwork By</p>
                          <p className="text-xl md:text-4xl font-black text-slate-800">{analysis.artistName}</p>
                          <div className="flex items-center justify-center gap-3 mt-2 text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest">
                            {analysis.age && <span>Age {analysis.age}</span>}
                            {analysis.grade && (
                              <><span className="w-1 h-1 bg-slate-300 rounded-full"></span><span>Grade {analysis.grade}</span></>
                            )}
                            {analysis.year && (
                              <><span className="w-1 h-1 bg-slate-300 rounded-full"></span><span>{analysis.year}</span></>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : currentPage === totalSpreads - 1 ? (
                  <div className="space-y-4 md:space-y-8">
                    <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-soft-gold/20 text-soft-gold rounded-full text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-2">
                      The End 🎬
                    </div>
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">What a Masterpiece!</h2>
                    
                    <div className="grid grid-cols-1 gap-3 pt-4 max-w-xs mx-auto">
                       {hasCompletedReading ? (
                         <button 
                           onClick={handleShare}
                           className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all"
                         >
                           <span>📤</span> SHARE STORY
                         </button>
                       ) : (
                         <button 
                           disabled
                           className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-gray-400 text-white rounded-2xl font-black text-base md:text-lg cursor-not-allowed opacity-50"
                         >
                           <span>📤</span> SHARE STORY
                         </button>
                       )}

                       <button 
                         onClick={handleSave}
                         className="flex items-center justify-center gap-3 w-full py-3 bg-white border-4 border-slate-100 text-slate-800 rounded-2xl font-black text-base md:text-lg hover:bg-slate-50 active:scale-95 transition-all"
                       >
                         <span>💾</span> SAVE MOVIE
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-8">
                    <div className="text-slate-200 text-4xl md:text-6xl font-serif">“</div>
                    <p className="text-lg md:text-3xl lg:text-4xl font-bold text-slate-800 leading-[1.3] font-serif italic px-2">
                      {analysis.pages[currentPage - 1].text}
                    </p>
                    <div className="text-slate-200 text-4xl md:text-6xl font-serif rotate-180">“</div>
                    <div className="pt-4 md:pt-8">
                       <span className="px-4 py-1.5 md:px-6 md:py-2 bg-slate-100 text-slate-400 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                         Page {currentPage} of {analysis.pages.length}
                       </span>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* Animation Overlay for Page Turn */}
          {isTurning && (
            <div className={`absolute top-0 bottom-0 w-1/2 z-[60] preserve-3d ${direction === 'next' ? 'right-0 origin-left' : 'left-0 origin-right'}`}
                 style={{ animation: `${direction === 'next' ? 'pageTurnRight' : 'pageTurnLeft'} 0.6s ease-in-out forwards` }}>
              <div className="absolute inset-0 bg-white shadow-2xl backface-hidden page-gradient border-l border-slate-100"></div>
              <div className="absolute inset-0 bg-white shadow-2xl backface-hidden page-gradient border-r border-slate-100" style={{ transform: 'rotateY(180deg)' }}></div>
            </div>
          )}
        </div>

        {/* EXTERNAL Navigation Buttons: Desktop */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between w-[calc(100%+160px)] -ml-[80px] pointer-events-none z-[120]">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0 || isTurning}
            className={`pointer-events-auto w-20 h-20 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center text-3xl transition-all shadow-2xl backdrop-blur-xl border border-white/20 active:scale-90 ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            ◀
          </button>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalSpreads - 1 || isTurning}
            className={`pointer-events-auto w-20 h-20 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center text-3xl transition-all shadow-2xl backdrop-blur-xl border border-white/20 active:scale-90 ${currentPage === totalSpreads - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            ▶
          </button>
        </div>

        {/* EXTERNAL Navigation Buttons: Mobile (Positioned at bottom corners to clear text) */}
        <div className="flex md:hidden absolute bottom-6 left-0 right-0 justify-between px-2 pointer-events-none z-[120]">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0 || isTurning}
            className={`pointer-events-auto w-16 h-16 bg-white/30 text-white rounded-full flex items-center justify-center text-2xl transition-all backdrop-blur-xl border border-white/20 active:scale-90 ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            ◀
          </button>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalSpreads - 1 || isTurning}
            className={`pointer-events-auto w-16 h-16 bg-white/30 text-white rounded-full flex items-center justify-center text-2xl transition-all backdrop-blur-xl border border-white/20 active:scale-90 ${currentPage === totalSpreads - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Progress Footer */}
      <div className="mt-8 flex flex-col items-center gap-4 z-20">
        <div className="flex items-center gap-2 md:gap-3">
          {Array.from({ length: totalSpreads }).map((_, idx) => {
            const isCurrentPage = currentPage === idx;
            const isAccessible = hasCompletedReading || idx <= highestPageReached;
            const isVisited = idx <= highestPageReached;
            
            return (
              <button
                key={idx}
                onClick={() => handleIndicatorClick(idx)}
                disabled={!isAccessible}
                className={`h-1.5 transition-all rounded-full ${
                  isCurrentPage 
                    ? 'w-8 md:w-10 bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]' 
                    : isAccessible
                      ? 'w-1.5 bg-white/20 hover:bg-white/40 cursor-pointer'
                      : 'w-1.5 bg-white/10 cursor-not-allowed opacity-30'
                }`}
              />
            );
          })}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-soft-gold transition-all duration-500" 
               style={{ width: `${((currentPage) / (totalSpreads - 1)) * 100}%` }}
             ></div>
          </div>
          <p className="text-white/40 font-black uppercase tracking-widest text-[8px] md:text-[10px]">
            {currentPage === 0 ? 'START' : currentPage === totalSpreads - 1 ? 'THE END' : `PAGE ${currentPage}`}
          </p>
        </div>
      </div>

      {/* Keyboard Hint */}
      {showKeyboardHint && (
        <div className="absolute bottom-6 right-6 z-[110] animate-in fade-in duration-500">
          <div className="px-3 py-2 bg-black/60 backdrop-blur-md text-white/80 rounded-lg text-xs font-medium shadow-xl border border-white/10">
            <span>← → to turn pages</span>
            <span className="mx-2 text-white/40">•</span>
            <span>ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Storybook;
