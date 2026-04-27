import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface MazeGameProps {
  onComplete: () => void;
}

const GRID_SIZE = 10;
const CELL_SIZE = 40;

export default function MazeGame({ onComplete }: MazeGameProps) {
  const [groomPos, setGroomPos] = useState({ x: 1, y: 1 });
  const [bridePos] = useState({ x: GRID_SIZE - 2, y: GRID_SIZE - 2 });
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Maze walls (simplified)
  const walls = [
    // Vertical walls
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: 0, y: i })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: GRID_SIZE - 1, y: i })),
    // Horizontal walls
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: 0 })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: GRID_SIZE - 1 })),
    // Internal maze walls
    { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
    { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 },
    { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 },
    { x: 7, y: 7 }, { x: 7, y: 8 },
  ];

  const isWall = (x: number, y: number) => {
    return walls.some(wall => wall.x === x && wall.y === y);
  };

  const moveGroom = (dx: number, dy: number) => {
    const newX = groomPos.x + dx;
    const newY = groomPos.y + dy;

    if (!isWall(newX, newY) && newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
      setGroomPos({ x: newX, y: newY });

      // Check if reached bride
      if (newX === bridePos.x && newY === bridePos.y) {
        setWon(true);
        setMessage('💕 See you at the wedding! 💕');
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (won) return;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          moveGroom(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          moveGroom(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          moveGroom(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          moveGroom(1, 0);
          break;
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

    // Clear canvas
    ctx.fillStyle = '#f9f8f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e8d5c4';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw walls
    ctx.fillStyle = '#2c2c2c';
    walls.forEach(wall => {
      ctx.fillRect(wall.x * CELL_SIZE, wall.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // Draw bride (destination)
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(
      bridePos.x * CELL_SIZE + CELL_SIZE / 2,
      bridePos.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw groom (player)
    ctx.fillStyle = '#f5e6d3';
    ctx.beginPath();
    ctx.arc(
      groomPos.x * CELL_SIZE + CELL_SIZE / 2,
      groomPos.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [groomPos, bridePos, walls]);

  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-[#e8d5c4]/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-6">
        <p className="text-[#6b6b6b] text-sm uppercase tracking-widest mb-2">Interactive Game</p>
        <p className="font-display text-2xl text-[#2c2c2c] mb-4">Help the Groom Find the Bride</p>
        <p className="text-[#6b6b6b] text-sm mb-4">
          Use arrow keys or WASD to move. 🤵 = Groom, 💛 = Bride
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-[#d4af37] rounded-lg"
        />
      </div>

      {won && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-[#d4af37] fill-[#d4af37]" />
          </motion.div>
          <p className="font-display text-2xl text-[#d4af37] mb-6">{message}</p>

          {/* Confetti animation */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed pointer-events-none"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                delay: Math.random() * 0.3,
              }}
            >
              <div className="text-2xl">
                {['💕', '✨', '🌸', '💍', '🎉'][Math.floor(Math.random() * 5)]}
              </div>
            </motion.div>
          ))}

          <Button
            onClick={onComplete}
            className="bg-[#d4af37] text-white hover:bg-[#c9a02e] px-8 py-3 rounded-lg font-display text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Invitation
          </Button>
        </motion.div>
      )}

      {!won && (
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            onClick={() => moveGroom(0, -1)}
            className="bg-[#e8d5c4] text-[#2c2c2c] hover:bg-[#d4af37] px-4 py-2"
          >
            ↑
          </Button>
          <Button
            onClick={() => moveGroom(-1, 0)}
            className="bg-[#e8d5c4] text-[#2c2c2c] hover:bg-[#d4af37] px-4 py-2"
          >
            ←
          </Button>
          <Button
            onClick={() => moveGroom(0, 1)}
            className="bg-[#e8d5c4] text-[#2c2c2c] hover:bg-[#d4af37] px-4 py-2"
          >
            ↓
          </Button>
          <Button
            onClick={() => moveGroom(1, 0)}
            className="bg-[#e8d5c4] text-[#2c2c2c] hover:bg-[#d4af37] px-4 py-2"
          >
            →
          </Button>
        </div>
      )}
    </motion.div>
  );
}
