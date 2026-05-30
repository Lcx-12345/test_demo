import GameBoard from '@/components/GameBoard';
import GameInfo from '@/components/GameInfo';
import NextPiece from '@/components/NextPiece';
import Controls from '@/components/Controls';
import GameOver from '@/components/GameOver';
import StartScreen from '@/components/StartScreen';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useKeyboard } from '@/hooks/useKeyboard';

export default function Home() {
  useGameLoop();
  useKeyboard();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at center, #0d0d1a 0%, #050508 70%)',
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <h1
          className="text-2xl tracking-widest mb-2"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            background: 'linear-gradient(90deg, #00f0ff, #ff2d75)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))',
          }}
        >
          TETRIS
        </h1>

        <div className="flex gap-6 items-start">
          <div className="relative">
            <GameBoard />
            <StartScreen />
            <GameOver />
          </div>

          <div className="flex flex-col gap-4">
            <GameInfo />
            <NextPiece />
          </div>
        </div>

        <Controls />
      </div>
    </div>
  );
}
