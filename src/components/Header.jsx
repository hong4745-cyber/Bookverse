import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import BubbleMenu from './BubbleMenu';
import AuthModal from './AuthModal';
import { auth } from '../lib/firebase';
import './Header.css';

const NAV_ITEMS = [
  { label: 'BOOKS', href: '/#books' },
  { label: 'CURATION', href: '/#curation' },
  { label: 'PROGRAMS', href: '/#programs' },
  { label: 'SPACE', href: '/#space' },
  { label: 'VISIT', href: '/#visit' },
  { label: 'MY', href: '/my' },
];

const BASE_BUBBLE_ITEMS = [
  { label: 'books', href: '/#books', ariaLabel: 'Books', hoverStyles: { bgColor: '#2f5fed', textColor: '#ffffff' } },
  { label: 'curation', href: '/#curation', ariaLabel: 'Curation', hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' } },
  { label: 'programs', href: '/#programs', ariaLabel: 'Programs', hoverStyles: { bgColor: '#219653', textColor: '#ffffff' } },
  { label: 'space', href: '/#space', ariaLabel: 'Space', hoverStyles: { bgColor: '#f2994a', textColor: '#ffffff' } },
  { label: 'visit', href: '/#visit', ariaLabel: 'Visit', hoverStyles: { bgColor: '#6155F5', textColor: '#ffffff' } },
  { label: 'my', href: '/my', ariaLabel: 'My applications', hoverStyles: { bgColor: '#f97316', textColor: '#ffffff' } },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const bubbleItems = useMemo(() => [
    ...BASE_BUBBLE_ITEMS,
    {
      label: user ? 'logout' : 'login',
      href: '#',
      ariaLabel: user ? 'Logout' : 'Login',
      hoverStyles: { bgColor: '#17171a', textColor: '#ffffff' },
      onClick: async (event) => {
        event.preventDefault();
        if (user) await signOut(auth);
        else setAuthOpen(true);
      },
    },
  ], [user]);

  const handleAuthClick = async () => {
    if (user) await signOut(auth);
    else setAuthOpen(true);
  };

  return (
    <header className="site-header">
      <div className="inner header-inner">
        <a href="/" className="logo">BOOKCOVERS</a>

        <nav className="nav-center">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="nav-item">{item.label}</a>
          ))}
        </nav>

        <div className="header-right">
          <button type="button" className="login-btn" onClick={handleAuthClick} title={user?.email || undefined}>
            {user ? 'LOGOUT' : 'LOGIN'}
          </button>
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
          items={bubbleItems}
          menuBg="#ffffff"
          menuContentColor="#17171a"
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />,
        document.body
      )}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
}
