import { useGameStore } from '../game/gameStore';

export default function GameOver() {
  const isGameOver = useGameStore(state => state.isGameOver);
  const score = useGameStore(state => state.score);
  const lines = useGameStore(state => state.lines);
  const level = useGameStore(state => state.level);
  const startGame = useGameStore(state => state.startGame);

  if (!isGameOver) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
      <div
        className="flex flex-col items-center gap-6 p-8 rounded-lg"
        style={{
          border: '2px solid rgba(255, 45, 117, 0.6)',
          boxShadow: '0 0 30px rgba(255, 45, 117, 0.3), inset 0 0 30px rgba(255, 45, 117, 0.05)',
          background: 'rgba(10, 10, 18, 0.95)',
        }}
      >
        <h2
          className="text-3xl tracking-widest"
          style={{
            color: '#ff2d75',
            fontFamily: "'Press Start 2P', monospace",
            textShadow: '0 0 20px rgba(255, 45, 117, 0.8)',
          }}
        >
          GAME OVER
        </h2>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
              FINAL SCORE
            </span>
            <span
              className="text-3xl font-bold"
              style={{
                color: '#f0f000',
                fontFamily: "'JetBrains Mono', monospace",
                textShadow: '0 0 15px rgba(240, 240, 0, 0.7)',
              }}
            >
              {score.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
                LINES
              </span>
              <span style={{ color: '#00ff66', fontFamily: "'JetBrains Mono', monospace" }}>
                {lines}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
                LEVEL
              </span>
              <span style={{ color: '#ff2d75', fontFamily: "'JetBrains Mono', monospace" }}>
                {level}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={startGame}
          className="px-6 py-3 rounded-md text-sm tracking-widest uppercase transition-all duration-200"
          style={{
            border: '2px solid #00f0ff',
            background: 'rgba(0, 240, 255, 0.1)',
            color: '#00f0ff',
            fontFamily: "'Press Start 2P', monospace",
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.25)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)';
          }}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}
