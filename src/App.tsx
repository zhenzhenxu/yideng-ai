import React, { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import FeatureCard from './components/FeatureCard';
import { useTimer } from './hooks/useTimer';
import { FEATURES, TECH_STACK } from './utils/constants';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const currentTime = useTimer();

  const handleIncrement = (): void => {
    setCount(prev => prev + 1);
  };

  const handleReset = (): void => {
    setCount(0);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1 className="title">
            🎯 Yideng AI
          </h1>
          <p className="subtitle">
            欢迎使用基于 React + TypeScript 的智能应用
          </p>
          <div className="time-display">
            当前时间: {currentTime}
          </div>
        </header>

        <main>
          <div className="card">
            <h2>计数器演示</h2>
            <Counter 
              count={count}
              onIncrement={handleIncrement}
              onReset={handleReset}
            />
          </div>

          <div className="card">
            <h2>功能特性</h2>
            <div className="features-grid">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>

          <div className="card">
            <h2>技术栈</h2>
            <div className="tech-stack">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </main>

        <footer className="App-footer">
          <p>
            Made with ❤️ using React + TypeScript
          </p>
          <p>
            <a
              href="https://github.com/zhenzhenxu/yideng-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              View on GitHub 🔗
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;