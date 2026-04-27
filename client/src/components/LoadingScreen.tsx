import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 bg-gradient-to-br from-[#f9f8f6] via-[#f5e6d3] to-[#f9f8f6] flex items-center justify-center z-50 ${isComplete ? 'pointer-events-none' : 'pointer-events-auto'}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, delay: 3 }}
    >
      <div className="text-center">
        {/* Shimmer glow effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-64 h-64 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <motion.h1
            className="font-display text-6xl md:text-7xl text-[#2c2c2c] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Mai
          </motion.h1>
          <motion.div
            className="h-1 w-16 bg-gradient-to-r from-[#d4af37] to-[#e8d5c4] mx-auto my-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.h1
            className="font-display text-6xl md:text-7xl text-[#2c2c2c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Ahmed
          </motion.h1>
        </motion.div>

        {/* Decorative sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full"
            initial={{
              opacity: 0,
              x: Math.cos((i / 6) * Math.PI * 2) * 100,
              y: Math.sin((i / 6) * Math.PI * 2) * 100,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos((i / 6) * Math.PI * 2) * 150,
              y: Math.sin((i / 6) * Math.PI * 2) * 150,
            }}
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.15,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
