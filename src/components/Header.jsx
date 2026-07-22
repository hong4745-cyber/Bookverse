import { useState } from 'react';
import './Header.css';

const NAV_ITEMS = ['BOOKS', 'CURATION', 'PROGRAMS', 'SPACE', 'VISIT'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="inner header-inner">
        <a href="#" className="logo">BOOKVERS</a>

        <nav className="nav-center">
          {NAV_ITEMS.map((item) => (
            <a key={item} href="#" className="nav-item">{item}</a>
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
