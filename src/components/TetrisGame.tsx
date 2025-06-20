'use client';

import { useState, useEffect, useCallback } from 'react';
import { BOARD_WIDTH, BOARD_HEIGHT, createEmptyBoard, TETROMINOS } from '@/utils/tetris';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';

export default function TetrisGame() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Generate random tetromino
  const getRandomTetromino = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape: TETROMINOS[randomPiece],
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0,
      type: randomPiece
    };
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomTetromino());
    setNextPiece(getRandomTetromino());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
  }, [getRandomTetromino]);

  // Check if piece can move to position
  const canMoveTo = useCallback((piece, newX, newY, newShape = piece.shape) => {
    for (let y = 0; y < newShape.length; y++) {
      for (let x = 0; x < newShape[y].length; x++) {
        if (newShape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Move piece
  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;
    
    if (canMoveTo(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }));
    } else if (dy > 0) {
      // Piece hit bottom, place it
      placePiece();
    }
  }, [currentPiece, gameOver, isPaused, canMoveTo]);

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    
    if (canMoveTo(currentPiece, currentPiece.x, currentPiece.y, rotated)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }));
    }
  }, [currentPiece, gameOver, isPaused, canMoveTo]);

  // Place piece on board
  const placePiece = useCallback(() => {
    if (!currentPiece) return;
    
    const newBoard = board.map(row => [...row]);
    
    // Place the piece
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.type;
          }
        }
      }
    }
    
    // Check for completed lines
    const completedLines = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (newBoard[y].every(cell => cell !== 0)) {
        completedLines.push(y);
      }
    }
    
    // Remove completed lines
    completedLines.forEach(lineIndex => {
      newBoard.splice(lineIndex, 1);
      newBoard.unshift(new Array(BOARD_WIDTH).fill(0));
    });
    
    // Update score and lines
    if (completedLines.length > 0) {
      const points = [0, 40, 100, 300, 1200][completedLines.length] * level;
      setScore(prev => prev + points);
      setLines(prev => prev + completedLines.length);
      setLevel(prev => Math.floor((lines + completedLines.length) / 10) + 1);
    }
    
    setBoard(newBoard);
    
    // Check game over
    if (currentPiece.y <= 0) {
      setGameOver(true);
      return;
    }
    
    // Get next piece
    setCurrentPiece(nextPiece);
    setNextPiece(getRandomTetromino());
  }, [currentPiece, board, level, lines, nextPiece, getRandomTetromino]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          rotatePiece();
          break;
        case 'p':
        case 'P':
          setIsPaused(prev => !prev);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePiece, gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;
    
    const dropSpeed = Math.max(50, 1000 - (level - 1) * 100);
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, dropSpeed);
    
    return () => clearInterval(interval);
  }, [movePiece, level, gameOver, isPaused]);

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex flex-col items-center">
        <GameBoard 
          board={board} 
          currentPiece={currentPiece}
        />
        <div className="mt-4 flex gap-4">
          <button
            onClick={initGame}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            New Game
          </button>
          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            disabled={gameOver}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
      
      <GameInfo
        score={score}
        level={level}
        lines={lines}
        nextPiece={nextPiece}
        gameOver={gameOver}
        isPaused={isPaused}
      />
    </div>
  );
}
