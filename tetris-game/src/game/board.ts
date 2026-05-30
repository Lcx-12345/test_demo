import { BOARD_WIDTH, BOARD_HEIGHT, TetrominoType } from './constants';
import { ActivePiece, getShape } from './tetrominoes';

export type BoardCell = TetrominoType | null;
export type Board = BoardCell[][];

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  );
}

export function isValidPosition(
  board: Board,
  piece: ActivePiece
): boolean {
  const shape = getShape(piece.type, piece.rotation);
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = piece.x + col;
        const newY = piece.y + row;
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }
        if (newY >= 0 && board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }
  return true;
}

export function lockPiece(board: Board, piece: ActivePiece): Board {
  const newBoard = board.map(row => [...row]);
  const shape = getShape(piece.type, piece.rotation);
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardY = piece.y + row;
        const boardX = piece.x + col;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }
  return newBoard;
}

export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  const emptyRows = Array.from({ length: linesCleared }, () =>
    Array(BOARD_WIDTH).fill(null)
  );
  return {
    board: [...emptyRows, ...newBoard],
    linesCleared,
  };
}

export function isGameOver(board: Board, piece: ActivePiece): boolean {
  return !isValidPosition(board, piece);
}

export function getGhostY(board: Board, piece: ActivePiece): number {
  let ghostY = piece.y;
  while (
    isValidPosition(board, { ...piece, y: ghostY + 1 })
  ) {
    ghostY++;
  }
  return ghostY;
}
