import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MagneticLink({ children, className, href = '#', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        ease: 'power2.out',
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 1,
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={className} {...props}>
      {children}
    </a>
  );
}
