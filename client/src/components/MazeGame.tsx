import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MazeGameProps {
  onComplete: () => void;
}

const GRID_SIZE = 12;
const CELL_SIZE = 30;

export default function MazeGame({ onComplete }: MazeGameProps) {
  const [groomPos, setGroomPos] = useState({ x: 1, y: 1 });
  const [bridePos] = useState({ x: GRID_SIZE - 2, y: GRID_SIZE - 2 });
  const [won, setWon] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Maze walls (designed to be a bit more interesting)
  const walls = [
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: 0, y: i })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: GRID_SIZE - 1, y: i })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: 0 })),
    ...Array.from({ length: GRID_SIZE }, (_, i) => ({ x: i, y: GRID_SIZE - 1 })),
    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 },
    { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 },
    { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 },
    { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 5 },
    { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 },
    { x: 7, y: 4 }, { x: 9, y: 4 }, { x: 10, y: 4 },
    { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 6, y: 9 },
  ];

  const isWall = (x: number, y: number) => {
    return walls.some(wall => wall.x === x && wall.y === y);
  };

  const moveGroom = (dx: number, dy: number) => {
    if (won) return;
    const newX = groomPos.x + dx;
    const newY = groomPos.y + dy;

    if (!isWall(newX, newY) && newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
      setGroomPos({ x: newX, y: newY });
      if (newX === bridePos.x && newY === bridePos.y) {
        setWon(true);
        setTimeout(() => onComplete(), 2000);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls with a gold-ish color
    ctx.fillStyle = '#d4af37';
    walls.forEach(wall => {
      ctx.fillRect(wall.x * CELL_SIZE, wall.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // Draw Bride Emoji
    ctx.font = `${CELL_SIZE * 0.8}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👰', bridePos.x * CELL_SIZE + CELL_SIZE / 2, bridePos.y * CELL_SIZE + CELL_SIZE / 2);

    // Draw Groom Emoji
    ctx.fillText('🤵', groomPos.x * CELL_SIZE + CELL_SIZE / 2, groomPos.y * CELL_SIZE + CELL_SIZE / 2);
  }, [groomPos, bridePos, walls]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-[#d4af37]/20 shadow-xl max-w-sm mx-auto">
      <h3 className="font-display text-xl text-[#2c2c2c] mb-4">وصل العريس للعروسة لفتح الدعوة</h3>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="rounded-lg shadow-inner bg-white"
      />
      <div className="grid grid-cols-3 gap-2 mt-6">
        <div />
        <button onClick={() => moveGroom(0, -1)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">↑</button>
        <div />
        <button onClick={() => moveGroom(-1, 0)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">←</button>
        <button onClick={() => moveGroom(0, 1)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">↓</button>
        <button onClick={() => moveGroom(1, 0)} className="p-3 bg-[#f5e6d3] rounded-full text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-colors">→</button>
      </div>
      {won && (
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-2xl"
        >
          <Heart className="w-16 h-16 text-[#d4af37] fill-[#d4af37] mb-2" />
          <p className="font-display text-2xl text-[#d4af37]">تم الوصول بنجاح!</p>
        </motion.div>
      )}
    </div>
  );
}
