'use client';

import { BOARD_WIDTH, BOARD_HEIGHT } from '@/utils/tetris';

const COLORS = {
  0: 'bg-gray-800',
  I: 'bg-cyan-400',
  O: 'bg-yellow-400',
  T: 'bg-purple-400',
  S: 'bg-green-400',
  Z: 'bg-red-400',
  J: 'bg-blue-400',
  L: 'bg-orange-400'
};

interface GameBoardProps {
  board: (string | number)[][];
  currentPiece: {
    shape: number[][];
    x: number;
    y: number;
    type: string;
  } | null;
}

export default function GameBoard({ board, currentPiece }: GameBoardProps) {
  // Create display board with current piece
  const displayBoard = board.map(row => [...row]);
  
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = currentPiece.type;
          }
        }
      }
    }
  }

  return (
    <div className="border-4 border-gray-600 bg-gray-900 p-2">
      <div 
        className="grid gap-px bg-gray-700"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-6 h-6 border border-gray-600 ${COLORS[cell] || COLORS[0]}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
