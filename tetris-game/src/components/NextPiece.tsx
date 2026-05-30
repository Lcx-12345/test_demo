import { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../game/gameStore';
import { PREVIEW_CELL_SIZE, NEON_COLORS, GLOW_COLORS } from '../game/constants';
import { getShape } from '../game/tetrominoes';

const PREVIEW_SIZE = 4 * PREVIEW_CELL_SIZE + 8;

export default function NextPiece() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextPiece = useGameStore(state => state.nextPiece);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = PREVIEW_SIZE;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, size, size);

    const shape = getShape(nextPiece, 0);
    const color = NEON_COLORS[nextPiece];
    const glow = GLOW_COLORS[nextPiece];

    const pieceWidth = shape[0].length * PREVIEW_CELL_SIZE;
    const pieceHeight = shape.length * PREVIEW_CELL_SIZE;
    const offsetX = (size - pieceWidth) / 2;
    const offsetY = (size - pieceHeight) / 2;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const px = offsetX + col * PREVIEW_CELL_SIZE;
          const py = offsetY + row * PREVIEW_CELL_SIZE;

          ctx.shadowColor = glow;
          ctx.shadowBlur = 8;
          ctx.fillStyle = color;
          ctx.fillRect(px + 1, py + 1, PREVIEW_CELL_SIZE - 2, PREVIEW_CELL_SIZE - 2);

          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fillRect(px + 1, py + 1, PREVIEW_CELL_SIZE - 2, 2);
          ctx.fillRect(px + 1, py + 1, 2, PREVIEW_CELL_SIZE - 2);
        }
      }
    }
    ctx.shadowBlur = 0;
  }, [nextPiece]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs tracking-widest uppercase" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
        NEXT
      </span>
      <canvas
        ref={canvasRef}
        width={PREVIEW_SIZE}
        height={PREVIEW_SIZE}
        style={{
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}
