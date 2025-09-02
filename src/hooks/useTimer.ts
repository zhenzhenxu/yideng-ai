import { useState, useEffect } from 'react';

export const useTimer = (): string => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('zh-CN'));
    };

    // 立即更新一次
    updateTime();

    // 设置定时器
    const timer = setInterval(updateTime, 1000);

    // 清理定时器
    return () => clearInterval(timer);
  }, []);

  return currentTime;
};