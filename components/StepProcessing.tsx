
import React, { useEffect, useState, useMemo } from 'react';

interface StepProcessingProps {
  text: string;
  originalImage: string | null;
  isAnimating?: boolean;
}

const ALL_MESSAGES = [
  "Consulting the Wise Old Owl for plot twists... 🦉",
  "Polishing the stars for extra twinkle... ⭐",
  "Asking the moon to hold the spotlight... 🌙",
  "Sprinkling extra-strength imagination dust... ✨",
  "Teaching your character how to high-five... ✋",
  "Baking a batch of fresh happy endings... 🧁",
  "Checking if the dragons have brushed their teeth... 🐉",
  "Borrowing a bucket of blue from the deep ocean... 🌊",
  "Collecting giggles to fuel the magic engine... 🤭",
  "Tying shoelaces on the running thoughts... 👟",
  "Knitting a cozy sweater for the plot... 🧶",
  "Chasing runaway adjectives across the page... 🏃‍♂️",
  "Waiting for the wizard to finish his morning tea... 🍵",
  "Inviting unicorns to the movie wrap party... 🦄",
  "Polishing the invisible fountain pen... 🖋️",
  "Whisking together a storm of stardust... 🌪️",
  "Searching for the perfect 'Once Upon a Time'... 📜",
  "Testing the gravity in a world of candy... 🍭",
  "Asking the fireflies to light up the scene... 🏮",
  "Checking if the pixels have had their breakfast... 🥣",
  "Gathering starlight to illuminate the adventure... 🌟",
  "Asking the mountain for its permission to move... ⛰️",
  "Whispering secrets to the colors... 🤫",
  "Catching moonbeams in a jar... 🫙",
  "Polishing the edges of a dream... 😴",
  "Teaching the clouds how to dance... ☁️",
  "Synchronizing the heartbeats of your characters... ❤️",
  "Drafting a map to a land of pure wonder... 🗺️",
  "Asking the trees to wave hello... 🌳",
  "Brewing a pot of inspiration tea... 🫖",
  "Inflating the bouncy castles of the imagination... 🏰",
  "Tuning the crickets' nightly orchestra... 🦗",
  "Counting the stripes on a daydream... 🦓",
  "Befriending a pocket-sized dragon... 🐲",
  "Collecting bubbles from a fountain of joy... 🫧",
  "Tidying up the corner of the universe... 🧹",
  "Asking the wind to carry the story home... 🌬️",
  "Consulting the library of unwritten books... 📚",
  "Waking up the sleeping adjectives... 💤",
  "Gathering golden threads for the plot... 🧵",
  "Polishing the echoes in the canyon... 📢",
  "Teaching the ocean how to whisper... 🐚",
  "Painting shadows with extra light... 💡",
  "Baking a pie filled with happy thoughts... 🥧",
  "Borrowing a pinch of purple from a twilight sky... 🌆",
  "Teaching the pebbles to sing in harmony... 🪨",
  "Checking the compass for the direction of 'Happily Ever After'... 🧭",
  "Asking the ladybugs to paint the dots on the story... 🐞",
  "Watering the garden of growing ideas... 🪴",
  "Stretching the rainbows to reach the next chapter... 🌈",
  "Polishing the glass slippers (just in case)... 👠",
  "Inviting the North Wind to blow some drama into the scene... 🌬️",
  "Helping the protagonist find their favorite socks... 🧦",
  "Asking the clock to slow down for the best parts... ⏰",
  "Checking if the giant is taking his afternoon nap... 💤",
  "Mixing a palette of colors that don't exist yet... 🎨",
  "Teaching the fountain to sprout liquid diamonds... 💎",
  "Asking the stars to align for a perfect scene... ✨",
  "Catching a falling leaf for a tiny character's boat... 🍃",
  "Whispering encouragement to the main character... 🗣️"
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
        <div className="w-48 h-48 border-[10px] border-slate-100 border-t-pink-500 border-r-orange-400 border-b-yellow-400 border-l-blue-400 rounded-full animate-spin"></div>
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
            <div className="absolute -top-4 -left-4 text-4xl animate-bounce">✨</div>
            <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce animation-delay-2000">🎨</div>
           </>
        )}
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 text-center px-4 min-h-[4rem] flex items-center justify-center">
        {isAnimating ? shuffledPool[currentIndex] : "Reading your magic art... 🪄"}
      </h3>
      
      <p className="text-slate-500 font-bold text-center max-w-sm px-6">
        {isAnimating 
          ? "Our magic computer is painting every frame of your 3D movie. Each story is one-of-a-kind!" 
          : "We're looking at your lines and colors to see the magic hidden inside."}
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
