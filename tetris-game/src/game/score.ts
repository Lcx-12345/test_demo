import { SCORE_TABLE, SOFT_DROP_SCORE, HARD_DROP_SCORE, LINES_PER_LEVEL, INITIAL_DROP_INTERVAL, LEVEL_SPEED_DECREASE, MIN_DROP_INTERVAL } from './constants';

export function calculateScore(linesCleared: number, level: number): number {
  if (linesCleared <= 0 || linesCleared > 4) return 0;
  return SCORE_TABLE[linesCleared] * level;
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / LINES_PER_LEVEL) + 1;
}

export function calculateDropInterval(level: number): number {
  const interval = INITIAL_DROP_INTERVAL - (level - 1) * LEVEL_SPEED_DECREASE;
  return Math.max(interval, MIN_DROP_INTERVAL);
}

export function softDropScore(droppedRows: number): number {
  return droppedRows * SOFT_DROP_SCORE;
}

export function hardDropScore(droppedRows: number): number {
  return droppedRows * HARD_DROP_SCORE;
}
