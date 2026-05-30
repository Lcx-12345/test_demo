import { useGameStore } from '../game/gameStore';

export default function Controls() {
  const moveLeft = useGameStore(state => state.moveLeft);
  const moveRight = useGameStore(state => state.moveRight);
  const moveDown = useGameStore(state => state.moveDown);
  const rotate = useGameStore(state => state.rotate);
  const hardDrop = useGameStore(state => state.hardDrop);

  const btnStyle: React.CSSProperties = {
    width: 52,
    height: 52,
    borderRadius: 8,
    border: '1px solid rgba(0, 240, 255, 0.4)',
    background: 'rgba(0, 240, 255, 0.08)',
    color: '#00f0ff',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    transition: 'all 0.1s ease',
  };

  const handleTouch = (action: () => void) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="flex flex-col items-center gap-2 md:hidden">
      <div className="flex gap-2">
        <button
          style={btnStyle}
          onTouchStart={handleTouch(rotate)}
          onMouseDown={handleTouch(rotate)}
        >
          ↻
        </button>
        <button
          style={btnStyle}
          onTouchStart={handleTouch(hardDrop)}
          onMouseDown={handleTouch(hardDrop)}
        >
          ⤓
        </button>
      </div>
      <div className="flex gap-2">
        <button
          style={btnStyle}
          onTouchStart={handleTouch(moveLeft)}
          onMouseDown={handleTouch(moveLeft)}
        >
          ◀
        </button>
        <button
          style={btnStyle}
          onTouchStart={handleTouch(moveDown)}
          onMouseDown={handleTouch(moveDown)}
        >
          ▼
        </button>
        <button
          style={btnStyle}
          onTouchStart={handleTouch(moveRight)}
          onMouseDown={handleTouch(moveRight)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
