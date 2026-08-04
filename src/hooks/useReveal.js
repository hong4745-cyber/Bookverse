import { useEffect, useRef, useState } from 'react';

// Scroll-triggered fade+rise reveal. Returns [ref, isVisible] — pair the ref
// with the shared `.reveal` class from tokens.css and toggle `.is-visible`.
export default function useReveal(options = {}) {
  const { threshold = 0.2, rootMargin = '0px 0px -60px 0px' } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
