import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MazeGameProps {
  onComplete: () => void;
}

const GRID_SIZE = 10;
const CELL_SIZE = 35;

export default function MazeGame({ onComplete }: MazeGameProps) {
  const [groomPos, setGroomPos] = useState({ x: 1, y: 1 });
  const [bridePos] = useState({ x: GRID_SIZE - 2, y: GRID_SIZE - 2 });
  const [won, setWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Maze walls
  const walls = [
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: 0, y: i })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: GRID_SIZE - 1, y: i })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: 0 })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: GRID_SIZE - 1 })),
    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
    { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 4, y: 5 },
    { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 7 },
    { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 },
    { x: 7, y: 7 }, { x: 7, y: 8 },
  ];

  const isWall = (x: number, y: number) => {
    return walls.some(wall => wall.x === x && wall.y === y);
  };

  const triggerConfetti = () => {
    // Confetti burst from center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f5e6d3', '#e8d5c4', '#ffffff'],
    });

    // Additional confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.2, y: 0.5 },
        colors: ['#d4af37', '#f5e6d3'],
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.8, y: 0.5 },
        colors: ['#d4af37', '#e8d5c4'],
      });
    }, 400);
  };

  const moveGroom = (dx: number, dy: number) => {
    if (won) return;
    const newX = groomPos.x + dx;
    const newY = groomPos.y + dy;

    if (!isWall(newX, newY) && newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
      setGroomPos({ x: newX, y: newY });
      if (newX === bridePos.x && newY === bridePos.y) {
        setWon(true);
        triggerConfetti();
        setTimeout(() => onComplete(), 1500);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (won) return;
      switch (e.key) {
        case 'ArrowUp': moveGroom(0, -1); break;
        case 'ArrowDown': moveGroom(0, 1); break;
        case 'ArrowLeft': moveGroom(-1, 0); break;
        case 'ArrowRight': moveGroom(1, 0); break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [groomPos, won]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls with Beige color
    ctx.fillStyle = '#f5e6d3';
    walls.forEach(wall => {
      ctx.fillRect(wall.x * CELL_SIZE, wall.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    ctx.font = `${CELL_SIZE * 0.7}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw Bride Emoji
    ctx.fillText('👰', bridePos.x * CELL_SIZE + CELL_SIZE / 2, bridePos.y * CELL_SIZE + CELL_SIZE / 2);
    // Draw Groom Emoji
    ctx.fillText('🤵', groomPos.x * CELL_SIZE + CELL_SIZE / 2, groomPos.y * CELL_SIZE + CELL_SIZE / 2);
  }, [groomPos, bridePos, walls]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e8d5c4]/30 shadow-lg max-w-sm mx-auto">
      <h3 className="font-display text-xl text-[#2c2c2c] mb-4">Help the Groom Find the Bride</h3>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="rounded-lg border-2 border-[#f5e6d3]"
      />
      {!won && (
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div />
          <button onClick={() => moveGroom(0, -1)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">↑</button>
          <div />
          <button onClick={() => moveGroom(-1, 0)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">←</button>
          <button onClick={() => moveGroom(0, 1)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">↓</button>
          <button onClick={() => moveGroom(1, 0)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">→</button>
        </div>
      )}
      {won && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 text-[#d4af37] fill-[#d4af37]" />
          </motion.div>
          <p className="font-display text-lg text-[#d4af37] mt-2">Together Forever!</p>
        </motion.div>
      )}
    </div>
  );
}
