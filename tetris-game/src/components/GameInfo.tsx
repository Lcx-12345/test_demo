import { useGameStore } from '../game/gameStore';

export default function GameInfo() {
  const score = useGameStore(state => state.score);
  const lines = useGameStore(state => state.lines);
  const level = useGameStore(state => state.level);
  const isPaused = useGameStore(state => state.isPaused);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="p-4 rounded-md flex flex-col items-center gap-1"
        style={{
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)',
          background: 'rgba(10, 10, 18, 0.8)',
        }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
          SCORE
        </span>
        <span
          className="text-2xl font-bold"
          style={{
            color: '#f0f000',
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: '0 0 10px rgba(240, 240, 0, 0.6)',
          }}
        >
          {score.toLocaleString()}
        </span>
      </div>

      <div
        className="p-4 rounded-md flex flex-col items-center gap-1"
        style={{
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)',
          background: 'rgba(10, 10, 18, 0.8)',
        }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
          LINES
        </span>
        <span
          className="text-xl font-bold"
          style={{
            color: '#00ff66',
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: '0 0 8px rgba(0, 255, 102, 0.5)',
          }}
        >
          {lines}
        </span>
      </div>

      <div
        className="p-4 rounded-md flex flex-col items-center gap-1"
        style={{
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)',
          background: 'rgba(10, 10, 18, 0.8)',
        }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#00f0ff', fontFamily: "'Press Start 2P', monospace" }}>
          LEVEL
        </span>
        <span
          className="text-xl font-bold"
          style={{
            color: '#ff2d75',
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: '0 0 8px rgba(255, 45, 117, 0.5)',
          }}
        >
          {level}
        </span>
      </div>

      {isPaused && (
        <div
          className="p-3 rounded-md text-center animate-pulse"
          style={{
            border: '1px solid rgba(255, 45, 117, 0.5)',
            background: 'rgba(255, 45, 117, 0.1)',
            color: '#ff2d75',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
          }}
        >
          PAUSED
        </div>
      )}
    </div>
  );
}
