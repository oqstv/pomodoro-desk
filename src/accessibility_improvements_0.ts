import { useState, useEffect, useRef } from 'react';

export function useAccessibilityImprovements() {
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsFocused(true);
      }
    };

    const handleBlur = () => setIsFocused(false);
    
    const timerElement = timerRef.current;
    if (timerElement) {
      timerElement.addEventListener('keydown', handleKeyDown);
      timerElement.addEventListener('blur', handleBlur);
      
      return () => {
        timerElement.removeEventListener('keydown', handleKeyDown);
        timerElement.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

  return {
    isFocused,
    timerRef,
    ariaLabel: isFocused ? "Active timer with keyboard focus" : "Timer control"
  };
}
