import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Music2 } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Browser may block autoplay
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://assets.mixkit.co/active_storage/sfx/2741/2741-preview.mp3"
        crossOrigin="anonymous"
      />
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 bg-[#d4af37] text-white p-3 rounded-full shadow-lg hover:bg-[#c9a02e] transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
            <Music className="w-6 h-6" />
          </motion.div>
        ) : (
          <Music2 className="w-6 h-6" />
        )}
      </motion.button>
    </>
  );
}
