import { useState } from 'react';
import { createPortal } from 'react-dom';
import BubbleMenu from './BubbleMenu';
import './Header.css';

const NAV_ITEMS = [
  { label: 'BOOKS', href: '#books' },
  { label: 'CURATION', href: '#curation' },
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'SPACE', href: '#space' },
  { label: 'VISIT', href: '#visit' },
];

const BUBBLE_ITEMS = [
  { label: 'books', href: '#books', ariaLabel: 'Books', hoverStyles: { bgColor: '#2f5fed', textColor: '#ffffff' } },
  { label: 'curation', href: '#curation', ariaLabel: 'Curation', hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' } },
  { label: 'programs', href: '#programs', ariaLabel: 'Programs', hoverStyles: { bgColor: '#219653', textColor: '#ffffff' } },
  { label: 'space', href: '#space', ariaLabel: 'Space', hoverStyles: { bgColor: '#f2994a', textColor: '#ffffff' } },
  { label: 'visit', href: '#visit', ariaLabel: 'Visit', hoverStyles: { bgColor: '#6155F5', textColor: '#ffffff' } },
  { label: 'login', href: '#', ariaLabel: 'Login', hoverStyles: { bgColor: '#17171a', textColor: '#ffffff' } },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="inner header-inner">
        <a href="#" className="logo">BOOKCOVERS</a>

        <nav className="nav-center">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="nav-item">{item.label}</a>
          ))}
        </nav>

        <div className="header-right">
          <a href="#" className="login-btn">LOGIN</a>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴"
            aria-pressed={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {createPortal(
        <BubbleMenu
          hideTrigger
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          items={BUBBLE_ITEMS}
          menuBg="#ffffff"
          menuContentColor="#17171a"
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />,
        document.body
      )}
    </header>
  );
}
