
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, Sparkles, BookOpen, Camera, Video, History, Quote, MessageCircleHeart } from 'lucide-react';
import StarsBackground from './components/StarsBackground';
import { MILESTONES, WORLD_TRENDS } from './constants';
import { GuestMessage } from './types';

// 3D Tilt Wrapper Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15; // Slightly reduced tilt for better control
    const rotateY = (centerX - x) / 15;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] transition-transform duration-200 ease-out cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [guestbook, setGuestbook] = useState<GuestMessage[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const babyName = "Yousuf";

  // Intersection Observer for Reveal Animations
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

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      date: new Date().toLocaleDateString()
    };
    setGuestbook([newMessage, ...guestbook]);
    setFormData({ name: '', message: '' });
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-slate-900 bg-[#010409]">
      <StarsBackground />

      {/* Hero Section */}
      <header className="relative z-10 pt-20 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        <div className="reveal mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md">
          <Stars className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
          <span className="uppercase tracking-[0.2em] sm:tracking-[0.4em] text-amber-500 font-bold text-[10px] sm:text-xs">First Year of Yousuf</span>
          <Stars className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
        </div>
        
        <h1 className="reveal delay-100 text-5xl sm:text-7xl md:text-9xl font-black mb-6 sm:mb-10 gold-gradient drop-shadow-[0_0_20px_rgba(217,119,6,0.3)] leading-[1.1]">
          Time Capsule
        </h1>
        
        <p className="reveal delay-200 text-lg sm:text-2xl md:text-3xl text-slate-400 italic mb-12 sm:mb-16 serif max-w-3xl mx-auto leading-relaxed font-light px-4">
          "A portal to your past, built with the stars of today."
        </p>

        {/* Intro Message */}
        <div className="reveal delay-300 glass-card p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-amber-500/10 relative group mx-2 sm:mx-0">
          <div className="absolute -top-6 -left-6 sm:-top-12 sm:-left-12 opacity-30 float-anim pointer-events-none">
            <Sparkles className="w-16 h-16 sm:w-24 sm:h-24 text-amber-400 blur-[1px]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-amber-400 serif text-left">Marhaba, {babyName}</h2>
          <div className="space-y-6 sm:space-y-8 text-base sm:text-xl md:text-2xl text-slate-300 leading-relaxed text-left serif italic">
            <p>
              Aaj tumne apni zindagi ka pehla saal mukammal kar liya hai. Abhi toh tumne sirf chalna seekha hai, 
              lekin hamari dua hai ke tum sitaron tak pahuncho. 
            </p>
            <p>
              Humne yeh website tumhare liye ek tohfe ke taur par banayi hai. Ismein tumhari wo shararatein aur 
              hamari wo duayein hain jo waqt ke sath purani nahi hongi.
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-amber-500/60 font-bold uppercase tracking-widest text-[10px] sm:text-sm">
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Projected Opening: February 2043</span>
            </div>
            <div className="flex -space-x-2 sm:-space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Family" />
                 </div>
               ))}
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-900 bg-amber-500 flex items-center justify-center text-slate-900 text-[10px] sm:text-xs font-black">+Fam</div>
            </div>
          </div>
        </div>
      </header>

      {/* Milestones */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="reveal text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 gold-gradient tracking-tight">First Adventures</h2>
          <p className="text-slate-500 text-sm sm:text-xl font-medium tracking-wide">THE LEGEND OF YOUR FIRST 365 DAYS</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {MILESTONES.map((milestone, idx) => (
            <div key={milestone.id} className={`reveal`} style={{ transitionDelay: `${idx * 150}ms` }}>
              <TiltCard className="h-full group hover:shadow-[0_15px_40px_rgba(251,191,36,0.1)]">
                <div className="text-4xl sm:text-6xl mb-6 sm:mb-8 bg-gradient-to-br from-slate-800 to-slate-950 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-amber-500/10 group-hover:border-amber-500/40 transition-colors shadow-2xl">
                  {milestone.icon}
                </div>
                <h3 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4 text-amber-300 tracking-tight">{milestone.title}</h3>
                <p className="text-sm sm:text-lg text-slate-400 leading-relaxed font-medium">{milestone.description}</p>
                <div className="mt-6 sm:mt-8 opacity-0 sm:group-hover:opacity-100 transition-opacity text-amber-500 font-bold text-[10px] uppercase tracking-widest">
                  Memory Stored Successfully
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* 2026 Snapshot */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6">
        <div className="reveal max-w-5xl mx-auto glass-card p-8 sm:p-16 md:p-24 rounded-[2rem] sm:rounded-[4rem] border-amber-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/10 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 sm:gap-16 items-start lg:items-center">
            <div className="flex-1 space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter">The World <br/><span className="text-amber-500">In 2026</span></h2>
              <p className="text-base sm:text-xl text-slate-400 leading-relaxed font-medium">
                While you were learning to giggle, the world was racing into a future of robots and rockets. Here's the vibe of the year you arrived:
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {WORLD_TRENDS.slice(0, 3).map((t, i) => (
                  <span key={i} className="px-3 py-1 sm:px-5 sm:py-2 rounded-full bg-slate-800/50 border border-slate-700 text-[10px] sm:text-sm font-bold text-slate-300">#{t.title}</span>
                ))}
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 gap-3 sm:gap-4 w-full">
              {WORLD_TRENDS.map((trend, idx) => (
                <div key={idx} className="reveal-x p-4 sm:p-6 bg-slate-900/40 rounded-2xl sm:rounded-3xl border border-slate-800 group hover:border-amber-500/30 transition-all flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl sm:rounded-2xl bg-slate-800 flex items-center justify-center text-amber-500 font-black">{idx + 1}</div>
                  <div>
                    <div className="text-[10px] font-black text-amber-600 uppercase mb-1 tracking-widest">{trend.category}</div>
                    <div className="text-sm sm:text-lg font-bold text-slate-200">{trend.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Letter */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6">
        <div className="reveal max-w-4xl mx-auto text-center mb-10 sm:mb-16">
           <Quote className="w-12 h-12 sm:w-20 sm:h-20 text-amber-500/20 mx-auto mb-4 sm:mb-8" />
           <h2 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 serif">A Message Across Time</h2>
        </div>
        
        <div className="reveal glass-card p-6 sm:p-12 md:p-24 rounded-[2rem] sm:rounded-[4rem] border-amber-500/10 shadow-2xl relative">
          <div className="prose prose-invert prose-lg sm:prose-2xl max-w-none serif italic leading-relaxed text-slate-300 space-y-6 sm:space-y-10 text-base sm:text-xl">
            <p className="reveal-y">Dear {babyName},</p>
            <p className="reveal-y delay-100">
              By the time you read these words, you will likely be standing on the threshold of adulthood, your voice deeper and your dreams larger than the tiny room where you took your first steps. 
            </p>
            <p className="reveal-y delay-200">
              The world will ask much of you. But please remember the boy who smiled with his whole soul just because his mother walked into the room. You were born into a family that celebrated your every breath.
            </p>
            <p className="reveal-y delay-300">
              Our hope for you is not that you never fail, but that you never lose your wonder. Be kind, be brave, and always reach for the stars.
            </p>
            <div className="reveal-y delay-400 pt-10 sm:pt-16 border-t border-slate-800">
              <p className="font-black text-amber-500 not-italic text-2xl sm:text-3xl mb-1 sm:mb-2">With endless love,</p>
              <p className="text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[10px] sm:text-sm">Your Entire Family</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guestbook */}
      <section className="relative z-10 py-16 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="reveal text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <MessageCircleHeart className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-6xl font-black mb-2 sm:mb-4">Digital Guestbook</h2>
          <p className="text-slate-500 text-sm sm:text-xl uppercase tracking-widest">LEAVE A STAR FOR HIM TO FIND LATER</p>
        </div>
        
        <div className="reveal glass-card p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] mb-12 sm:mb-20">
          <form onSubmit={handleGuestbookSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest ml-1 sm:ml-2">Legacy Holder Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl sm:rounded-3xl px-6 py-4 sm:px-8 sm:py-5 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/5 outline-none transition-all text-base sm:text-xl"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest ml-1 sm:ml-2">Opening Date</label>
                <div className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl sm:rounded-3xl px-6 py-4 sm:px-8 sm:py-5 text-slate-500 font-bold text-base sm:text-xl">
                  Locked Until 2043
                </div>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest ml-1 sm:ml-2">Message to Future {babyName}</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl sm:rounded-3xl px-6 py-4 sm:px-8 sm:py-6 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/5 outline-none transition-all text-base sm:text-xl resize-none"
                  placeholder="What should he know about life?"
                />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-black py-4 sm:py-6 rounded-2xl sm:rounded-3xl transition-all transform hover:scale-[1.02] shadow-[0_15px_40px_rgba(251,191,36,0.2)] flex items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl group"
            >
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-current group-hover:scale-125 transition-transform" />
              Store in Galaxy
            </button>
          </form>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {guestbook.map((msg, index) => (
            <div key={msg.id} className="reveal">
              <TiltCard className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5 -rotate-12 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <Sparkles className="w-24 h-24 sm:w-32 sm:h-32 text-amber-400" />
                </div>
                <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 text-xl sm:text-2xl font-black flex-shrink-0">
                    {msg.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-amber-400">{msg.name}</h4>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Earth Date: {msg.date}</span>
                  </div>
                </div>
                <p className="text-lg sm:text-2xl text-slate-200 serif italic leading-relaxed border-l-2 sm:border-l-4 border-amber-500/30 pl-4 sm:pl-8">
                  "{msg.message}"
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 sm:py-32 px-4 text-center">
        <div className="reveal max-w-2xl mx-auto space-y-8 sm:space-y-12">
          <div className="flex justify-center gap-6 sm:gap-8">
             <Stars className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
             <div className="relative">
               <Heart className="text-pink-500 w-10 h-10 sm:w-12 sm:h-12 fill-current animate-bounce" />
               <div className="absolute inset-0 bg-pink-500 blur-xl opacity-30 animate-pulse" />
             </div>
             <Stars className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-amber-400 serif tracking-wide leading-tight">
            Tum hamesha hamari <br className="hidden sm:block"/> aankhon ka tara rahoge.
          </h2>
          <div className="space-y-2">
            <p className="text-slate-600 font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-sm">
              Digital Archeology Department • 2026-2043
            </p>
            <p className="text-slate-800 text-[8px] sm:text-[10px] uppercase tracking-widest font-bold">Encrypted with Endless Love</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
