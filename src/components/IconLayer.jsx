import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './IconLayer.css';

export default function IconLayer({ icons, radius = 160, maxScale = 2.2 }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const items = Array.from(layer.querySelectorAll('.icon-item'));

    const onMove = (e) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const d = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );
        const p = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, radius, 1, 0, d));
        gsap.to(item, {
          scale: 1 + (maxScale - 1) * p,
          duration: 0.35,
          overwrite: true,
          ease: 'power2.out',
        });
      });
    };

    const onLeave = () => {
      items.forEach((item) => {
        gsap.to(item, { scale: 1, duration: 0.6, overwrite: true, ease: 'power2.out' });
      });
    };

    layer.addEventListener('mousemove', onMove);
    layer.addEventListener('mouseleave', onLeave);
    return () => {
      layer.removeEventListener('mousemove', onMove);
      layer.removeEventListener('mouseleave', onLeave);
    };
  }, [radius, maxScale]);

  return (
    <div ref={layerRef} className="icon-layer">
      {icons.map(({ src, x, y, size = 52, rotate = 0 }, i) => (
        <img
          key={i}
          className="icon-item"
          src={src}
          alt=""
          draggable={false}
          style={{ left: x, top: y, width: size, height: size, rotate: `${rotate}deg` }}
        />
      ))}
    </div>
  );
}
