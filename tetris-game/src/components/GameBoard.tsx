import { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../game/gameStore';
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE, NEON_COLORS, GLOW_COLORS, TetrominoType } from '../game/constants';
import { getShape } from '../game/tetrominoes';
import { getGhostY } from '../game/board';

const BOARD_PIXEL_WIDTH = BOARD_WIDTH * CELL_SIZE;
const BOARD_PIXEL_HEIGHT = BOARD_HEIGHT * CELL_SIZE;

function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: TetrominoType,
  isGhost: boolean = false
) {
  const color = NEON_COLORS[type];
  const glow = GLOW_COLORS[type];
  const px = x * CELL_SIZE;
  const py = y * CELL_SIZE;

  if (isGhost) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.3;
    ctx.strokeRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    ctx.globalAlpha = 1;
    return;
  }

  ctx.shadowColor = glow;
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);

  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, 3);
  ctx.fillRect(px + 1, py + 1, 3, CELL_SIZE - 2);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(px + CELL_SIZE - 3, py + 1, 2, CELL_SIZE - 2);
  ctx.fillRect(px + 1, py + CELL_SIZE - 3, CELL_SIZE - 2, 2);
}

export default function GameBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board = useGameStore(state => state.board);
  const currentPiece = useGameStore(state => state.currentPiece);
  const clearingRows = useGameStore(state => state.clearingRows);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT);

    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT);

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, BOARD_PIXEL_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(BOARD_PIXEL_WIDTH, y * CELL_SIZE);
      ctx.stroke();
    }

    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (clearingRows.includes(y)) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, y * CELL_SIZE, BOARD_PIXEL_WIDTH, CELL_SIZE);
        continue;
      }
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const cell = board[y][x];
        if (cell) {
          drawCell(ctx, x, y, cell);
        }
      }
    }

    if (currentPiece) {
      const ghostY = getGhostY(board, currentPiece);
      const shape = getShape(currentPiece.type, currentPiece.rotation);

      if (ghostY !== currentPiece.y) {
        for (let row = 0; row < shape.length; row++) {
          for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
              const gx = currentPiece.x + col;
              const gy = ghostY + row;
              if (gy >= 0) {
                drawCell(ctx, gx, gy, currentPiece.type, true);
              }
            }
          }
        }
      }

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const px = currentPiece.x + col;
            const py = currentPiece.y + row;
            if (py >= 0) {
              drawCell(ctx, px, py, currentPiece.type);
            }
          }
        }
      }
    }

    ctx.shadowBlur = 0;
  }, [board, currentPiece, clearingRows]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="relative" style={{ width: BOARD_PIXEL_WIDTH, height: BOARD_PIXEL_HEIGHT }}>
      <canvas
        ref={canvasRef}
        width={BOARD_PIXEL_WIDTH}
        height={BOARD_PIXEL_HEIGHT}
        className="rounded-sm"
        style={{
          border: '2px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.05)',
        }}
      />
    </div>
  );
}
