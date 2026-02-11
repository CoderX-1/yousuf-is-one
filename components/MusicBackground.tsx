import React, { useRef, useEffect } from 'react';

interface MusicBackgroundProps {
  src?: string;
  autoPlay?: boolean;
}

const MusicBackground: React.FC<MusicBackgroundProps> = ({ 
  src = 'music.mp3', 
  autoPlay = true 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volume = 0.3; // Always set to 30%

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch(() => {
      // Browser may block autoplay, that's okay
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={src} 
        loop 
        preload="auto"
      />
    </>
  );
};

export default MusicBackground;
