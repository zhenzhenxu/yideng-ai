import React from 'react';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onReset: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, onIncrement, onReset }) => {
  return (
    <div className="counter-section">
      <div className="counter-display">
        当前计数: <span className="count-number">{count}</span>
      </div>
      <div className="button-group">
        <button className="btn" onClick={onIncrement}>
          增加 +1
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          重置
        </button>
      </div>
    </div>
  );
};

export default Counter;