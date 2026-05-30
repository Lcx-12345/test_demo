import { create } from 'zustand';
import { BOARD_WIDTH, BOARD_HEIGHT, TetrominoType, NEON_COLORS } from './constants';
import { ActivePiece, createPiece, randomType, getShape, rotatePiece } from './tetrominoes';
import { Board, BoardCell, createEmptyBoard, isValidPosition, lockPiece, clearLines, getGhostY } from './board';
import { calculateScore, calculateLevel, calculateDropInterval, softDropScore, hardDropScore } from './score';

export interface GameState {
  board: Board;
  currentPiece: ActivePiece | null;
  nextPiece: TetrominoType;
  score: number;
  lines: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  dropInterval: number;
  clearingRows: number[];
  lastAction: string;
}

interface GameActions {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => boolean;
  rotate: () => void;
  hardDrop: () => void;
  tick: () => void;
  clearClearingRows: () => void;
}

export type GameStore = GameState & GameActions;

function spawnPiece(state: GameState): Partial<GameState> {
  const newPiece = createPiece(state.nextPiece);
  const nextType = randomType();

  if (!isValidPosition(state.board, newPiece)) {
    return {
      currentPiece: newPiece,
      nextPiece: nextType,
      isGameOver: true,
      isPlaying: false,
    };
  }

  return {
    currentPiece: newPiece,
    nextPiece: nextType,
  };
}

function lockAndClear(state: GameState): Partial<GameState> {
  if (!state.currentPiece) return {};

  const newBoard = lockPiece(state.board, state.currentPiece);
  const { board: clearedBoard, linesCleared } = clearLines(newBoard);

  const newLines = state.lines + linesCleared;
  const newLevel = calculateLevel(newLines);
  const newScore = state.score + calculateScore(linesCleared, state.level);
  const newDropInterval = calculateDropInterval(newLevel);

  const clearingRows = linesCleared > 0
    ? newBoard
        .map((row, idx) => (row.every(cell => cell !== null) ? idx : -1))
        .filter(idx => idx !== -1)
    : [];

  const spawnResult = spawnPiece({
    ...state,
    board: linesCleared > 0 ? clearedBoard : newBoard,
    score: newScore,
    lines: newLines,
    level: newLevel,
    dropInterval: newDropInterval,
  });

  return {
    board: linesCleared > 0 ? clearedBoard : newBoard,
    score: newScore,
    lines: newLines,
    level: newLevel,
    dropInterval: newDropInterval,
    clearingRows,
    ...spawnResult,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  board: createEmptyBoard(),
  currentPiece: null,
  nextPiece: randomType(),
  score: 0,
  lines: 0,
  level: 1,
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  dropInterval: 1000,
  clearingRows: [],
  lastAction: '',

  startGame: () => {
    const nextType = randomType();
    const currentPiece = createPiece(nextType);
    const newNextType = randomType();

    set({
      board: createEmptyBoard(),
      currentPiece,
      nextPiece: newNextType,
      score: 0,
      lines: 0,
      level: 1,
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      dropInterval: 1000,
      clearingRows: [],
      lastAction: 'start',
    });
  },

  pauseGame: () => set({ isPaused: true, lastAction: 'pause' }),
  resumeGame: () => set({ isPaused: false, lastAction: 'resume' }),

  moveLeft: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver || !state.currentPiece) return;

    const moved = { ...state.currentPiece, x: state.currentPiece.x - 1 };
    if (isValidPosition(state.board, moved)) {
      set({ currentPiece: moved, lastAction: 'moveLeft' });
    }
  },

  moveRight: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver || !state.currentPiece) return;

    const moved = { ...state.currentPiece, x: state.currentPiece.x + 1 };
    if (isValidPosition(state.board, moved)) {
      set({ currentPiece: moved, lastAction: 'moveRight' });
    }
  },

  moveDown: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver || !state.currentPiece) return false;

    const moved = { ...state.currentPiece, y: state.currentPiece.y + 1 };
    if (isValidPosition(state.board, moved)) {
      const dropScore = softDropScore(1);
      set({ currentPiece: moved, score: state.score + dropScore, lastAction: 'moveDown' });
      return true;
    } else {
      set(lockAndClear(state));
      return false;
    }
  },

  rotate: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver || !state.currentPiece) return;

    const rotated = rotatePiece(state.currentPiece);

    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      const kicked = { ...rotated, x: rotated.x + kick };
      if (isValidPosition(state.board, kicked)) {
        set({ currentPiece: kicked, lastAction: 'rotate' });
        return;
      }
    }
  },

  hardDrop: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver || !state.currentPiece) return;

    const ghostY = getGhostY(state.board, state.currentPiece);
    const droppedRows = ghostY - state.currentPiece.y;
    const dropScore = hardDropScore(droppedRows);

    const dropped = { ...state.currentPiece, y: ghostY };
    const newState = { ...state, currentPiece: dropped, score: state.score + dropScore };
    set(lockAndClear(newState));
  },

  tick: () => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.isGameOver || !state.currentPiece) return;

    const moved = { ...state.currentPiece, y: state.currentPiece.y + 1 };
    if (isValidPosition(state.board, moved)) {
      set({ currentPiece: moved, lastAction: 'tick' });
    } else {
      set(lockAndClear(state));
    }
  },

  clearClearingRows: () => set({ clearingRows: [], lastAction: 'clearClearingRows' }),
}));
