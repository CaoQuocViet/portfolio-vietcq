import { useEffect } from 'react';

export function useWindowsSound() {
  useEffect(() => {
    const audio = new Audio('/audio/Windows_Vista_7_8_10.mp3');
    audio.volume = 0.8;
    
    // Simple: try to play, if fails then on first click
    audio.play().catch(() => {
      const handleClick = () => {
        audio.play();
        document.removeEventListener('click', handleClick);
      };
      document.addEventListener('click', handleClick, { once: true });
    });
  }, []);
}
