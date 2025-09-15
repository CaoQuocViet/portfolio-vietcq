import { useState, useCallback } from 'react';

export function useWindowsSound() {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    return JSON.parse(localStorage.getItem('windowsSoundEnabled') ?? 'true');
  });

  const toggleSound = useCallback(() => {
    setIsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('windowsSoundEnabled', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const playSound = useCallback(() => {
    if (!isEnabled) return;
    
    const audio = new Audio('/audio/Windows_Vista_7_8_10.mp3');
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    
    gain.gain.value = 2.0; // 2x volume
    source.connect(gain).connect(ctx.destination);
    
    audio.play().catch(() => {
      document.addEventListener('click', () => audio.play(), { once: true });
    });
  }, [isEnabled]);

  return { isEnabled, toggleSound, playSound };
}
