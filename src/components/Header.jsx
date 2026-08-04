import { useState } from 'react';
import './Header.css';

const NAV_ITEMS = [
  { label: 'BOOKS', href: '#books' },
  { label: 'CURATION', href: '#curation' },
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'SPACE', href: '#space' },
  { label: 'VISIT', href: '#visit' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="inner header-inner">
        <a href="#" className="logo">BOOKVERS</a>

        <nav className="nav-center">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="nav-item">{item.label}</a>
          ))}
        </nav>

        <div className="header-right">
          <a href="#" className="login-btn">LOGIN</a>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
