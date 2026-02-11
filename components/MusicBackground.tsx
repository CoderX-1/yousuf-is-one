import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicBackgroundProps {
  src?: string;
  autoPlay?: boolean;
}

const MusicBackground: React.FC<MusicBackgroundProps> = ({ 
  src = '/music.mp3', 
  autoPlay = true 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Browser may block autoplay, that's okay
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={src} 
        loop 
        preload="auto"
      />
      
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full glass-card hover:bg-opacity-80 transition-all duration-300 backdrop-blur-lg"
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 size={24} className="text-amber-400" />
        ) : (
          <VolumeX size={24} className="text-slate-400" />
        )}
      </button>

      {isPlaying && (
        <div className="fixed bottom-24 right-8 z-50 flex flex-col gap-2 p-3 glass-card rounded-lg backdrop-blur-lg">
          <label className="text-xs text-amber-400 font-semibold">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32 cursor-pointer"
          />
          <span className="text-xs text-slate-400">{Math.round(volume * 100)}%</span>
        </div>
      )}
    </>
  );
};

export default MusicBackground;
