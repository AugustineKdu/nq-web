import { useState, useEffect } from 'react';

export function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          } else {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('section[id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return isVisible;
}