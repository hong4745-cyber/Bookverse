import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  { label: 'home', href: '#', ariaLabel: 'Home', hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
  { label: 'about', href: '#', ariaLabel: 'About', hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
  { label: 'projects', href: '#', ariaLabel: 'Documentation', hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
  { label: 'blog', href: '#', ariaLabel: 'Blog', hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
  { label: 'contact', href: '#', ariaLabel: 'Contact', hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  open,
  onClose,
  hideTrigger = false
}) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isMenuOpen = isControlled ? open : uncontrolledOpen;
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const bubblesRef = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

  const requestChange = (nextState) => {
    if (nextState) setShowOverlay(true);
    if (isControlled) {
      if (!nextState) onClose?.();
    } else {
      setUncontrolledOpen(nextState);
    }
    onMenuClick?.(nextState);
  };

  const handleToggle = () => requestChange(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) setShowOverlay(true);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleToggle();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);

    if (!overlay || !panel) return undefined;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([panel, backdrop, ...bubbles]);
      gsap.set(panel, { xPercent: 100 });
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(bubbles, { x: 24, autoAlpha: 0 });

      gsap.to(backdrop, { autoAlpha: 1, duration: animationDuration * 0.8, ease: 'power2.out' });
      gsap.to(panel, { xPercent: 0, duration: animationDuration, ease: animationEase });

      bubbles.forEach((bubble, i) => {
        const delay = 0.08 + i * staggerDelay + gsap.utils.random(-0.03, 0.03);
        gsap.to(bubble, {
          x: 0,
          autoAlpha: 1,
          duration: animationDuration * 0.7,
          ease: 'power3.out',
          delay
        });
      });
    } else if (showOverlay) {
      gsap.killTweensOf([panel, backdrop, ...bubbles]);
      gsap.to(backdrop, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(panel, {
        xPercent: 100,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  return (
    <>
      {!hideTrigger && (
        <nav className={containerClassName} style={style} aria-label="Main navigation">
          <div className="logo-plain" aria-label="Logo">
            <span className="logo-content">
              {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
            </span>
          </div>

          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line short" style={{ background: menuContentColor }} />
          </button>
        </nav>
      )}

      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
        >
          <div ref={backdropRef} className="sidebar-backdrop" onClick={handleToggle} />

          <aside ref={panelRef} className="sidebar-panel" style={{ background: menuBg }}>
            <ul className="pill-list" role="menu" aria-label="Menu links">
              {menuItems.map((item, idx) => (
                <li key={idx} role="none" className="pill-col">
                  <a
                    role="menuitem"
                    href={item.href}
                    aria-label={item.ariaLabel || item.label}
                    className="pill-link"
                    style={{
                      '--pill-color': menuContentColor,
                      '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                      '--hover-color': item.hoverStyles?.textColor || menuContentColor
                    }}
                    onClick={(event) => {
                      item.onClick?.(event);
                      handleToggle();
                    }}
                    ref={el => {
                      if (el) bubblesRef.current[idx] = el;
                    }}
                  >
                    <span className="pill-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}
