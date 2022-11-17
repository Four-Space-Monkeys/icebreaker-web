import { useEffect, useState } from 'react';

// timeLimit is in seconds

const useCountDown = (timeLimit: number) => {
  const [seconds, setSeconds] = useState(timeLimit % 60);
  const [minutes, setMinutes] = useState(Math.floor(timeLimit / 60));

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return [minutes, seconds];
};

export default useCountDown;
