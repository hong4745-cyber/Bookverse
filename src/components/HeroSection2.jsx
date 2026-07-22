import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BOOK_COVERS } from '../data/books';
import BookCover from './BookCover';
import './HeroSection2.css';

const ROW_CONFIG = [
  { dir: 'ltr', base: 140 },
  { dir: 'rtl', base: 155 },
  { dir: 'ltr', base: 165 },
  { dir: 'rtl', base: 158 },
  { dir: 'ltr', base: 172 },
  { dir: 'rtl', base: 180 },
];

function getRowBooks(rowIndex) {
  const books = [...BOOK_COVERS];
  const offset = rowIndex * Math.floor(books.length / 6);
  return [...books.slice(offset), ...books.slice(0, offset)];
}

export default function HeroSection2() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const flowerSvg = sectionRef.current.querySelector('.s2-flower svg');
    const anim = gsap.to(flowerSvg, {
      rotation: 360, duration: 12, repeat: -1, ease: 'none', transformOrigin: '50% 50%',
    });
    return () => anim.kill();
  }, []);

  return (
    <section className="hero-section-2" ref={sectionRef} id="hero2">
      <div className="s2-bg-img" />
      <div className="s2-bg-color" style={{ '--pattern-color': '#FFCC00' }} />

      {/* 마키 레이어 */}
      <div className="s2-marquee-layer">
        <div className="s2-marquee-container">
          {ROW_CONFIG.map((config, i) => {
            const books = getRowBooks(i);
            const tripled = [...books, ...books, ...books];
            return (
              <div className="s2-marquee-row" key={i}>
                <div
                  className={`s2-marquee-track ${config.dir === 'rtl' ? 'rtl' : 'ltr'}`}
                  style={{ animationDuration: `${config.base}s` }}
                >
                  {tripled.map((book, j) => (
                    <BookCover key={`s2-${i}-${j}`} book={book} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 텍스트 레이어 */}
      <div className="s2-text-layer">
        <div className="inner s2-text-inner">
          <p className="s2-small-title">INDEPENDENT BOOKSHOP</p>
          <h2 className="s2-main-heading">
            <span className="s2-line s2-line-1">BOOKS</span>
            <span className="s2-line s2-line-2">SELECTED</span>
            <span className="s2-line s2-line-3">WITH A POINT</span>
            <span className="s2-line s2-line-4">OF VIEW.</span>
          </h2>
          <p className="s2-desc">빠르게 소비되는 책보다 오래 곁에 남는 이야기를 소개합니다.</p>
        </div>
      </div>

      {/* 보라색 꽃 */}
      <div className="s2-flower" aria-hidden="true">
        <svg viewBox="0 0 120 120" width="160" height="160">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle} cx="60" cy="60" rx="18" ry="34"
              fill="#7c3aed" opacity="0.9"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="12" fill="#4c1d95" />
        </svg>
      </div>

      {/* 연두색 나비 */}
      <div className="s2-butterfly" aria-hidden="true">
        <svg viewBox="0 0 100 80" width="130" height="104">
          <ellipse cx="30" cy="28" rx="28" ry="22" fill="#b5f542" opacity="0.9" transform="rotate(-25 30 28)" />
          <ellipse cx="70" cy="28" rx="28" ry="22" fill="#b5f542" opacity="0.9" transform="rotate(25 70 28)" />
          <ellipse cx="25" cy="56" rx="18" ry="13" fill="#86ef2e" opacity="0.85" transform="rotate(-15 25 56)" />
          <ellipse cx="75" cy="56" rx="18" ry="13" fill="#86ef2e" opacity="0.85" transform="rotate(15 75 56)" />
          <path d="M50 18 Q52 40 50 62 Q48 40 50 18" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="1.5" />
          <path d="M50 18 Q44 10 38 7" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
          <path d="M50 18 Q56 10 62 7" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
