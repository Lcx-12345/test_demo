import { useEffect, useCallback } from 'react';
import { useGameStore } from '../game/gameStore';

export function useKeyboard() {
  const moveLeft = useGameStore(state => state.moveLeft);
  const moveRight = useGameStore(state => state.moveRight);
  const moveDown = useGameStore(state => state.moveDown);
  const rotate = useGameStore(state => state.rotate);
  const hardDrop = useGameStore(state => state.hardDrop);
  const pauseGame = useGameStore(state => state.pauseGame);
  const resumeGame = useGameStore(state => state.resumeGame);
  const isPlaying = useGameStore(state => state.isPlaying);
  const isPaused = useGameStore(state => state.isPaused);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
        case 'Escape':
          e.preventDefault();
          if (isPaused) {
            resumeGame();
          } else {
            pauseGame();
          }
          break;
      }
    },
    [isPlaying, isPaused, moveLeft, moveRight, moveDown, rotate, hardDrop, pauseGame, resumeGame]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
