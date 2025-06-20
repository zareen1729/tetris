import TetrisGame from '@/components/TetrisGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Tetris Game</h1>
        <TetrisGame />
      </div>
    </main>
  );
}
