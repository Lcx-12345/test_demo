import { useGameStore } from '../game/gameStore';

export default function StartScreen() {
  const isPlaying = useGameStore(state => state.isPlaying);
  const isGameOver = useGameStore(state => state.isGameOver);
  const startGame = useGameStore(state => state.startGame);

  if (isPlaying || isGameOver) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
      <div className="flex flex-col items-center gap-8">
        <h1
          className="text-5xl tracking-wider"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            background: 'linear-gradient(135deg, #00f0ff, #ff2d75, #f0f000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.5))',
          }}
        >
          TETRIS
        </h1>

        <p
          className="text-xs tracking-widest"
          style={{
            color: 'rgba(0, 240, 255, 0.6)',
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          NEON EDITION
        </p>

        <button
          onClick={startGame}
          className="px-8 py-4 rounded-md text-sm tracking-widest uppercase transition-all duration-200 animate-pulse"
          style={{
            border: '2px solid #00f0ff',
            background: 'rgba(0, 240, 255, 0.1)',
            color: '#00f0ff',
            fontFamily: "'Press Start 2P', monospace",
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.25)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.5)';
            e.currentTarget.style.animation = 'none';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
          }}
        >
          START
        </button>

        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-xs" style={{ color: 'rgba(0, 240, 255, 0.4)', fontFamily: "'Press Start 2P', monospace" }}>
            CONTROLS
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: "'JetBrains Mono', monospace" }}>
            <span>← →</span><span>Move</span>
            <span>↑</span><span>Rotate</span>
            <span>↓</span><span>Soft Drop</span>
            <span>Space</span><span>Hard Drop</span>
            <span>P / Esc</span><span>Pause</span>
          </div>
        </div>
      </div>
    </div>
  );
}
