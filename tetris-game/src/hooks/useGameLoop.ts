import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../game/gameStore';

export function useGameLoop() {
  const tick = useGameStore(state => state.tick);
  const isPlaying = useGameStore(state => state.isPlaying);
  const isPaused = useGameStore(state => state.isPaused);
  const isGameOver = useGameStore(state => state.isGameOver);
  const dropInterval = useGameStore(state => state.dropInterval);
  const lastTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number>(0);

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed >= dropInterval) {
        lastTimeRef.current = timestamp;
        tick();
      }

      rafIdRef.current = requestAnimationFrame(gameLoop);
    },
    [tick, dropInterval]
  );

  useEffect(() => {
    if (isPlaying && !isPaused && !isGameOver) {
      lastTimeRef.current = 0;
      rafIdRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isPlaying, isPaused, isGameOver, gameLoop]);
}
