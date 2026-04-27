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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
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
      className="min-h-screen bg-[#f9f8f6] py-16 px-6 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-4xl mx-auto zoom-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bismillah - Thuluth Font */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="font-thuluth text-5xl md:text-6xl text-[#d4af37] mb-4">
            بسم الله الرحمن الرحيم
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </motion.div>

        {/* Quranic Verse - Diwani Font */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-10 md:p-16 mb-16 border border-[#d4af37]/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full -mr-16 -mt-16" />
          <p className="font-diwani text-3xl md:text-4xl text-[#2c2c2c] leading-[1.8] mb-8 text-center">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>
          <div className="h-0.5 w-20 bg-[#d4af37]/40 mx-auto mb-6" />
          <p className="text-[#d4af37] text-lg text-center font-display tracking-widest uppercase">— Quran 30:21 —</p>
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="font-display text-6xl md:text-8xl text-[#2c2c2c] mb-4 tracking-tight">
            Mai & Ahmed
          </h1>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="h-[1px] w-20 bg-[#d4af37]" />
            <div className="text-[#d4af37] text-2xl">💍</div>
            <div className="h-[1px] w-20 bg-[#d4af37]" />
          </div>
        </motion.div>

        {/* Date and Location */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/90 rounded-2xl p-8 border border-[#d4af37]/10 text-center shadow-xl">
            <Calendar className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
            <p className="text-[#6b6b6b] text-xs uppercase tracking-[0.3em] mb-2">The Date</p>
            <p className="font-display text-3xl text-[#2c2c2c]">30 June 2026</p>
          </div>
          <div className="bg-white/90 rounded-2xl p-8 border border-[#d4af37]/10 text-center shadow-xl">
            <MapPin className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
            <p className="text-[#6b6b6b] text-xs uppercase tracking-[0.3em] mb-2">The Venue</p>
            <p className="font-display text-2xl text-[#2c2c2c]">Olivia Hall, Talkha</p>
            <p className="text-sm text-[#6b6b6b] mt-2">Armed Forces Club, Nile Corniche</p>
          </div>
        </motion.div>

        {/* Maze Game - Gatekeeper */}
        {!gameWon && (
          <motion.div variants={itemVariants} className="mb-20">
            <MazeGame onComplete={() => setGameWon(true)} />
          </motion.div>
        )}

        {/* Hidden Content - Revealed after winning */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-16"
            >
              {/* View Location Button */}
              <div className="flex justify-center">
                <Button
                  onClick={openGoogleMaps}
                  className="bg-[#d4af37] text-white hover:bg-[#c9a02e] px-12 py-7 rounded-full font-display text-xl transition-all duration-500 shadow-2xl hover:scale-105"
                >
                  View Location on Maps
                </Button>
              </div>

              {/* Dress Code Section */}
              <div className="bg-[#f5e6d3]/50 rounded-3xl p-10 text-center border border-[#d4af37]/20">
                <Shirt className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                <h3 className="font-display text-2xl text-[#2c2c2c] mb-4 uppercase tracking-widest">Dress Code</h3>
                <p className="text-lg text-[#6b6b6b] mb-4">نرجو من ضيوفنا الكرام الالتزام بالدريس كود</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5dc] border border-[#d4af37]/30 shadow-sm" />
                  <span className="font-display text-xl text-[#2c2c2c] font-semibold">BEIGE / بيج</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="py-8">
                <CountdownTimer targetDate="2026-06-30" />
              </div>

              {/* Footer */}
              <div className="text-center pt-12 border-t border-[#d4af37]/20">
                <p className="font-display text-xl text-[#d4af37] mb-2 italic">Waiting for you!</p>
                <p className="text-[#6b6b6b] text-sm tracking-widest uppercase">Mai & Ahmed Wedding</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
