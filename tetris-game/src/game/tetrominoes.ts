import { TetrominoType } from './constants';

export interface TetrominoShape {
  type: TetrominoType;
  rotations: number[][][];
}

const TETROMINOES: Record<TetrominoType, TetrominoShape> = {
  I: {
    type: 'I',
    rotations: [
      [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
      [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
      [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
      [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    ],
  },
  O: {
    type: 'O',
    rotations: [
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
      [[1,1],[1,1]],
    ],
  },
  T: {
    type: 'T',
    rotations: [
      [[0,1,0],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,1],[0,1,0]],
      [[0,1,0],[1,1,0],[0,1,0]],
    ],
  },
  S: {
    type: 'S',
    rotations: [
      [[0,1,1],[1,1,0],[0,0,0]],
      [[0,1,0],[0,1,1],[0,0,1]],
      [[0,0,0],[0,1,1],[1,1,0]],
      [[1,0,0],[1,1,0],[0,1,0]],
    ],
  },
  Z: {
    type: 'Z',
    rotations: [
      [[1,1,0],[0,1,1],[0,0,0]],
      [[0,0,1],[0,1,1],[0,1,0]],
      [[0,0,0],[1,1,0],[0,1,1]],
      [[0,1,0],[1,1,0],[1,0,0]],
    ],
  },
  J: {
    type: 'J',
    rotations: [
      [[1,0,0],[1,1,1],[0,0,0]],
      [[0,1,1],[0,1,0],[0,1,0]],
      [[0,0,0],[1,1,1],[0,0,1]],
      [[0,1,0],[0,1,0],[1,1,0]],
    ],
  },
  L: {
    type: 'L',
    rotations: [
      [[0,0,1],[1,1,1],[0,0,0]],
      [[0,1,0],[0,1,0],[0,1,1]],
      [[0,0,0],[1,1,1],[1,0,0]],
      [[1,1,0],[0,1,0],[0,1,0]],
    ],
  },
};

export const TETROMINO_TYPES: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

export function getShape(type: TetrominoType, rotation: number): number[][] {
  return TETROMINOES[type].rotations[rotation % 4];
}

export function randomType(): TetrominoType {
  return TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
}

export interface ActivePiece {
  type: TetrominoType;
  rotation: number;
  x: number;
  y: number;
}

export function createPiece(type: TetrominoType): ActivePiece {
  const shape = getShape(type, 0);
  return {
    type,
    rotation: 0,
    x: Math.floor((10 - shape[0].length) / 2),
    y: type === 'I' ? -1 : 0,
  };
}

export function rotatePiece(piece: ActivePiece): ActivePiece {
  return {
    ...piece,
    rotation: (piece.rotation + 1) % 4,
  };
}
