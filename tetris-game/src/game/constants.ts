export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_SIZE = 30;
export const PREVIEW_CELL_SIZE = 20;

export const INITIAL_DROP_INTERVAL = 1000;
export const MIN_DROP_INTERVAL = 100;
export const LEVEL_SPEED_DECREASE = 100;
export const LINES_PER_LEVEL = 10;

export const SCORE_TABLE = [0, 100, 300, 500, 800] as const;
export const SOFT_DROP_SCORE = 1;
export const HARD_DROP_SCORE = 2;

export const NEON_COLORS = {
  I: '#00f0ff',
  O: '#f0f000',
  T: '#b000ff',
  S: '#00ff66',
  Z: '#ff2d75',
  J: '#3366ff',
  L: '#ff8800',
} as const;

export const GLOW_COLORS = {
  I: 'rgba(0, 240, 255, 0.6)',
  O: 'rgba(240, 240, 0, 0.6)',
  T: 'rgba(176, 0, 255, 0.6)',
  S: 'rgba(0, 255, 102, 0.6)',
  Z: 'rgba(255, 45, 117, 0.6)',
  J: 'rgba(51, 102, 255, 0.6)',
  L: 'rgba(255, 136, 0, 0.6)',
} as const;

export type TetrominoType = keyof typeof NEON_COLORS;
