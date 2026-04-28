import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import MazeGame from './MazeGame';

interface InvitationPageProps {
  onComplete?: () => void;
}

export default function InvitationPage({ onComplete }: InvitationPageProps) {
  const [gameWon, setGameWon] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/Olivia+Hall,+Talkha,+Armed+Forces+Club,+Nile+Corniche',
      '_blank'
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#f9f8f6] via-[#ffffff] to-[#f5e6d3] py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bismillah - Thuluth Font */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="font-thuluth text-4xl md:text-5xl text-[#d4af37] mb-2">
            بسم الله الرحمن الرحيم
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </motion.div>

        {/* Quranic Verse - Diwan Thuluth (Diwani proxy) */}
        <motion.div
          variants={itemVariants}
          className="bg-white/60 backdrop-blur-sm rounded-lg p-8 md:p-12 mb-12 border border-[#e8d5c4]/30 shadow-lg"
        >
          <p className="font-diwani text-3xl md:text-4xl text-[#2c2c2c] leading-relaxed mb-6 text-center">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>
          <div className="h-0.5 w-16 bg-[#d4af37] mx-auto my-4" />
          <p className="text-[#6b6b6b] text-lg leading-relaxed italic text-center">
            "And among His Signs is this, that He created for you wives from among yourselves, that you may find repose in them, and He has put between you affection and mercy."
          </p>
          <p className="text-[#d4af37] text-sm mt-4 text-center">— Quran 30:21</p>
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="font-display text-5xl md:text-7xl text-[#2c2c2c] mb-2">
            Mai & Ahmed
          </h1>
          <div className="flex justify-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#d4af37] to-transparent" />
            <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <div className="h-0.5 w-12 bg-gradient-to-l from-[#d4af37] to-transparent" />
          </div>
        </motion.div>

        {/* Date and Location */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#e8d5c4]/30 text-center">
            <Calendar className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
            <p className="text-[#6b6b6b] text-sm uppercase tracking-widest mb-2">Date</p>
            <p className="font-display text-2xl text-[#2c2c2c]">30 June 2026</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#e8d5c4]/30 text-center">
            <MapPin className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
            <p className="text-[#6b6b6b] text-sm uppercase tracking-widest mb-2">Location</p>
            <p className="font-display text-lg text-[#2c2c2c]">Olivia Hall, Talkha</p>
            <p className="text-sm text-[#6b6b6b] mt-1">Armed Forces Club, Nile Corniche</p>
          </div>
        </motion.div>

        {/* Maze Game - Now before View Location */}
        <motion.div variants={itemVariants} className="mb-12">
          <MazeGame onComplete={() => setGameWon(true)} />
        </motion.div>

        {/* Hidden Content - Revealed after winning */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* View Location Button */}
              <div className="flex justify-center">
                <Button
                  onClick={openGoogleMaps}
                  className="bg-[#d4af37] text-white hover:bg-[#c9a02e] px-8 py-3 rounded-lg font-display text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Location on Maps
                </Button>
              </div>

              {/* Dress Code Section */}
              <div className="bg-white/40 backdrop-blur-sm rounded-lg p-8 text-center border border-[#e8d5c4]/30">
                <Shirt className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
                <h3 className="font-display text-xl text-[#2c2c2c] mb-2 uppercase tracking-widest">Dress Code</h3>
                <p className="text-[#6b6b6b] mb-4">We would love to see you in our wedding theme color</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f5f5dc] border border-[#d4af37]/20" />
                  <span className="font-display text-lg text-[#2c2c2c]">BEIGE</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mb-12">
                <CountdownTimer targetDate="2026-06-30" />
              </div>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-[#e8d5c4]">
                <p className="text-[#6b6b6b] text-sm">
                  We look forward to celebrating this special moment with you.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
