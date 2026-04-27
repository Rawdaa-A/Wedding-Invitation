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
      className="flex flex-col items-center justify-center min-h-screen bg-[#f9f8f6] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Envelope Container - Full screen focus */}
      <motion.div
        className="relative w-full h-screen cursor-pointer flex items-center justify-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onOpen}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Envelope Image - Filling the frame */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/envelope.png"
            alt="Wedding Invitation Envelope"
            className="w-full h-full object-cover md:object-contain drop-shadow-2xl"
          />

          {/* Overlay to make it feel more interactive */}
          <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Floating Click Hint */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2 text-[#d4af37] font-display"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail size={32} className="drop-shadow-md" />
            <span className="text-xl uppercase tracking-[0.2em] font-semibold drop-shadow-sm">Open Invitation</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
