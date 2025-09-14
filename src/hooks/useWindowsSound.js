import { useEffect } from 'react';

export function useWindowsSound() {
  useEffect(() => {
    const audio = new Audio('/audio/Windows_Vista_7_8_10.mp3');
    audio.volume = 0.8;
    
    // Simple: just try to play
    audio.play().catch(() => {
      // If autoplay blocked, play on first user click
      document.addEventListener('click', () => audio.play(), { once: true });
    });
  }, []);
}
