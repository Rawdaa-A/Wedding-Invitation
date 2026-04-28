import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface EnvelopeCardProps {
  onOpen: () => void;
}

export default function EnvelopeCard({ onOpen }: EnvelopeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#f5e6d3] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-[#6b6b6b] text-lg tracking-widest uppercase">You are invited to</p>
      </motion.div>

      {/* Envelope Container - Back to original size */}
      <motion.div
        className="relative w-full max-w-md h-auto cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onOpen}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Envelope Image */}
        <motion.div
          className="relative"
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/assets/envelope.webp"
            alt="Wedding Invitation Envelope"
            className="w-full h-auto drop-shadow-2xl"
          />

          {/* Floating animation */}
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Hover hint */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 text-[#d4af37] font-display text-sm">
            <Mail size={16} />
            <span>Click to open</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-12 h-12 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="2" />
          <path d="M50 20 L60 40 L80 40 L65 55 L75 75 L50 60 L25 75 L35 55 L20 40 L40 40 Z" fill="#d4af37" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-8 h-8 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#e8d5c4" strokeWidth="2" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
