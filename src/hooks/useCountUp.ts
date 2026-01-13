import { useState, useEffect } from 'react';

export const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = Date.now();
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(target, Math.floor((step * elapsed) / 16));

      setCount(current);

      if (current >= target) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};
