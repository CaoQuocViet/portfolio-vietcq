import { useEffect } from 'react';

export function useWindowsSound() {
  useEffect(() => {
    const audio = new Audio('/audio/Windows_Vista_7_8_10.mp3');
    audio.volume = 1; // Increased volume to 60%
    
    // Simple play with user interaction fallback
    const playSound = () => {
      audio.play().catch(() => {
        // If autoplay fails, play on first user interaction
        const handleInteraction = () => {
          audio.play();
          document.removeEventListener('click', handleInteraction);
        };
        document.addEventListener('click', handleInteraction, { once: true });
      });
    };

    playSound();
  }, []);
}
