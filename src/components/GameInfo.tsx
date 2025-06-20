'use client';

const COLORS = {
  I: 'bg-cyan-400',
  O: 'bg-yellow-400',
  T: 'bg-purple-400',
  S: 'bg-green-400',
  Z: 'bg-red-400',
  J: 'bg-blue-400',
  L: 'bg-orange-400'
};

interface GameInfoProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: {
    shape: number[][];
    type: string;
  } | null;
  gameOver: boolean;
  isPaused: boolean;
}

export default function GameInfo({ score, level, lines, nextPiece, gameOver, isPaused }: GameInfoProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white min-w-[200px]">
      {gameOver && (
        <div className="mb-4 p-4 bg-red-600 rounded text-center">
          <h2 className="text-xl font-bold">Game Over!</h2>
        </div>
      )}
      
      {isPaused && !gameOver && (
        <div className="mb-4 p-4 bg-yellow-600 rounded text-center">
          <h2 className="text-xl font-bold">Paused</h2>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Score</h3>
          <p className="text-2xl font-mono">{score.toLocaleString()}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <p className="text-2xl font-mono">{level}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Lines</h3>
          <p className="text-2xl font-mono">{lines}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Next Piece</h3>
          <div className="bg-gray-900 p-3 rounded">
            {nextPiece && (
              <div 
                className="grid gap-px"
                style={{
                  gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 1fr)`
                }}
              >
                {nextPiece.shape.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className={`w-4 h-4 ${cell ? COLORS[nextPiece.type] : 'bg-transparent'}`}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-300">
        <h4 className="font-semibold mb-2">Controls:</h4>
        <ul className="space-y-1">
          <li>← → Move</li>
          <li>↓ Soft drop</li>
          <li>↑ / Space Rotate</li>
          <li>P Pause</li>
        </ul>
      </div>
    </div>
  );
}
