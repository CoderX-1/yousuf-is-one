
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, Sparkles, BookOpen, Camera, Video, History, Quote, MessageCircleHeart, PlayCircle, Rocket, Gift, X } from 'lucide-react';
import StarsBackground from './components/StarsBackground';
import { MILESTONES, WORLD_TRENDS } from './constants';
import { GuestMessage } from './types';

// 3D Tilt Wrapper Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20; 
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card transition-transform duration-300 ease-out cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

// Interactive Dynamic Cake Component
const StarCake: React.FC<{ age: number }> = ({ age }) => {
  const [blownCandles, setBlownCandles] = useState<boolean[]>(new Array(age).fill(false));
  const [showConfetti, setShowConfetti] = useState(false);

  const allBlown = blownCandles.every(c => c === true);

  const handleBlowCandle = (index: number) => {
    if (blownCandles[index]) return;
    const newBlown = [...blownCandles];
    newBlown[index] = true;
    setBlownCandles(newBlown);
    
    if (newBlown.every(c => c === true)) {
      setShowConfetti(true);
    }
  };

  const resetCake = () => {
    setBlownCandles(new Array(age).fill(false));
    setShowConfetti(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-16">
      <div className="relative group">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
             {[...Array(30)].map((_, i) => (
               <div 
                key={i} 
                className="absolute w-2 h-2 bg-amber-400 rounded-full animate-ping"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px)`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0
                }}
               />
             ))}
          </div>
        )}

        <div className="absolute -top-12 inset-x-0 flex justify-center gap-4 z-30">
          {blownCandles.map((isBlown, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
              onClick={() => handleBlowCandle(i)}
            >
              {!isBlown ? (
                <div className="w-4 h-8 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px] animate-pulse relative mb-1">
                  <div className="absolute inset-0 bg-white/30 blur-md animate-ping" />
                </div>
              ) : (
                 <div className="w-1 h-4 bg-slate-700 rounded-t-full mb-1 opacity-50" />
              )}
              <div className="w-2 h-10 bg-gradient-to-b from-amber-200 to-amber-500 border-x border-amber-600 rounded-t-sm shadow-lg" />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="w-40 h-20 bg-gradient-to-b from-amber-400/20 to-amber-600/40 backdrop-blur-xl border border-amber-500/30 rounded-t-[2.5rem] relative z-20 shadow-xl">
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-amber-500/80 serif">{age}</span>
             </div>
          </div>
          <div className="w-60 h-24 bg-gradient-to-b from-amber-500/30 to-amber-700/50 backdrop-blur-xl border border-amber-500/40 rounded-t-[3rem] -mt-2 relative z-10 shadow-2xl">
             <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
                {[...Array(Math.min(age + 2, 8))].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 text-pink-500/40 fill-current" />
                ))}
             </div>
          </div>
          <div className="w-72 h-6 bg-slate-800 rounded-full -mt-2 shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-slate-700" />
        </div>

        <div className={`mt-12 transition-all duration-1000 transform ${allBlown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
           <h3 className="text-4xl sm:text-7xl font-black gold-gradient serif mb-4 uppercase tracking-tighter">
             Happy {age}{age === 1 ? 'st' : age === 2 ? 'nd' : age === 3 ? 'rd' : 'th'} Birthday!
           </h3>
           <p className="text-slate-400 text-xl sm:text-2xl serif italic max-w-lg mx-auto">
             "Make a wish, Yousuf! The stars are waiting for your dreams to take flight."
           </p>
           <button onClick={resetCake} className="mt-8 px-6 py-2 rounded-full border border-amber-500/30 text-amber-500/60 text-xs font-bold uppercase tracking-widest hover:bg-amber-500/10 transition-colors">
             Light the candles again
           </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const babyName = "Yousuf";
  const birthYear = 2025; 
  const currentYear = new Date().getFullYear();
  const currentAge = Math.max(1, currentYear - birthYear);
  const targetYear = birthYear + 5;

  // Placeholder URLs - Users can replace these with real URLs
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Replace with real video URL
  const babyPhotos = [
    `bacha.jpeg`,
    `bacha3.jpeg`,
    `bacha2.jpeg`,
    `bacha1.jpeg`,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-slate-900 bg-[#010409]">
      <StarsBackground />

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        <div className="reveal mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md">
          <Rocket className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          <span className="uppercase tracking-[0.2em] sm:tracking-[0.4em] text-amber-500 font-bold text-[10px] sm:text-xs">
            Growing up fast: Currently {currentAge} {currentAge === 1 ? 'Year' : 'Years'} Old
          </span>
          <Stars className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
        </div>
        
        <h1 className="reveal delay-100 text-5xl sm:text-7xl md:text-9xl font-black mb-6 sm:mb-10 gold-gradient drop-shadow-[0_0_20px_rgba(217,119,6,0.3)] leading-[1.1]">
          Yousuf's Legacy
        </h1>
        
        <p className="reveal delay-200 text-lg sm:text-2xl md:text-3xl text-slate-400 italic mb-12 sm:mb-16 serif max-w-3xl mx-auto leading-relaxed font-light px-4">
          "A portal to your first steps, built to grow with you year after year."
        </p>

        <div className="reveal delay-300 glass-card p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] border-amber-500/10 relative group mx-2 sm:mx-0">
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-amber-400 serif text-left">Yoo, {babyName}!</h2>
          <div className="space-y-6 sm:space-y-8 text-base sm:text-xl md:text-2xl text-slate-300 leading-relaxed text-left serif italic">
            <p>
              Abhi tum bade ho rahe ho, aur har saal tumhara yeh digital "Time Capsule" bhi tumhare sath bharha hai. 
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-amber-500/60 font-bold uppercase tracking-widest text-[10px] sm:text-sm">
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Full Archive Unlocks: {targetYear}</span>
            </div>
            <div className="flex -space-x-2 sm:-space-x-3">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="Family Member" />
                 </div>
               ))}
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-900 bg-amber-500 flex items-center justify-center text-slate-900 text-[10px] sm:text-xs font-black">+Fam</div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Cake Section */}
      <section className="relative z-10 py-16 sm:py-32 px-4 text-center overflow-hidden">
        <div className="reveal max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-widest mb-6">
            <Gift className="w-4 h-4" />
            Dynamic Birthday Cake
          </div>
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Blow the Candles!</h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto serif italic">
            Har saal is cake par ek nayi shama (candle) badhti rahegi. Aaj tum {currentAge} {currentAge === 1 ? 'saal' : 'saal'} ke ho gaye ho!
          </p>
        </div>
        <div className="reveal">
          <StarCake age={currentAge} />
        </div>
      </section>

      {/* Media Gallery Section - UPDATED TO BE UNLOCKED AND PLAYABLE */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Photos */}
          <div className="reveal">
            <TiltCard className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-500/10 rounded-2xl">
                  <Camera className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-black">Memory Vault</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                {babyPhotos.map((url, i) => (
                  <div key={i} onClick={() => setSelectedPhoto(url)} className="aspect-square rounded-xl sm:rounded-2xl bg-slate-800 overflow-hidden relative group/img cursor-zoom-in">
                    <img src={url} alt={`Baby Yousuf ${i}`} className="w-full h-full object-cover group-hover/img:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-black uppercase tracking-widest">View Full</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm sm:text-base italic text-center">Tap any photo to see it clearly.</p>
            </TiltCard>
          </div>

          {/* Videos - Now Unlocked and Playable */}
          <div className="reveal delay-200">
            <TiltCard onClick={() => setIsVideoPlaying(true)} className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] h-full flex flex-col group/vid-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-500/10 rounded-2xl">
                  <Video className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-black">Video Wishes</h2>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-900/50 rounded-2xl sm:rounded-[2rem] border-2 border-slate-800 group/vid relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/vid-thumb/800/400')] bg-cover bg-center opacity-30 group-hover/vid:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/40" />
                <PlayCircle className="w-16 h-16 sm:w-24 sm:h-24 text-amber-500 relative z-10 group-hover/vid-card:scale-110 transition-transform" />
                <div className="relative z-10 text-center mt-6">
                  <p className="text-amber-400 font-bold text-base sm:text-xl uppercase tracking-widest mb-2">Unlocked & Ready</p>
                  <p className="text-slate-300 text-sm sm:text-base italic px-4 font-medium">Click to play your first birthday memories.</p>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Available Now</span>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">HD Playback</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Lightbox / Modals */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedPhoto(null)}>
          <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
          <img src={selectedPhoto} className="max-w-full max-h-full rounded-lg sm:rounded-2xl shadow-2xl object-contain animate-in zoom-in-95 duration-300" alt="Full View" />
        </div>
      )}

      {isVideoPlaying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
            <button 
              onClick={() => setIsVideoPlaying(false)} 
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors border border-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <video 
              src={videoUrl} 
              className="w-full h-full" 
              controls 
              autoPlay 
              onEnded={() => setIsVideoPlaying(false)}
            />
          </div>
        </div>
      )}

      {/* The Letter */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6">
        <div className="reveal max-w-4xl mx-auto text-center mb-10 sm:mb-16">
           <div className="flex justify-center gap-6 sm:gap-8">
             <Rocket className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
             <Heart className="text-pink-500 w-10 h-10 sm:w-12 sm:h-12 fill-current animate-pulse" />
             <Stars className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10 animate-spin-slow" />
          </div>
           <h2 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 serif">A Message Across Time</h2>
           
        </div>
       <div className="reveal glass-card p-6 sm:p-12 md:p-24 rounded-[2rem] sm:rounded-[4rem] border-amber-500/10 shadow-2xl relative">
          <div className="prose prose-invert prose-lg sm:prose-2xl max-w-none serif italic leading-relaxed text-slate-300 space-y-6 sm:space-y-10 text-base sm:text-xl">
            <p className="reveal-y">Dear Boy {babyName},</p>
            <p className="reveal-y delay-100">
              You are 5 now! That means you are a boy, maybe even ready for school adventures! When we made this for you, you were just a tiny baby who loved to giggle and crawl around.
            </p>
            <p className="reveal-y delay-300">
              Stay brave, be kind to your friends, and never stop reaching for the stars.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
