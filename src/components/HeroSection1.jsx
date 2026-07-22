import { useRef } from 'react';
import { BOOK_COVERS } from '../data/books';
import BookCover from './BookCover';
import './HeroSection1.css';

// 6개 행: 방향 및 속도 설정
const ROW_CONFIG = [
  { dir: 'ltr', duration: 140 },
  { dir: 'rtl', duration: 155 },
  { dir: 'ltr', duration: 165 },
  { dir: 'rtl', duration: 158 },
  { dir: 'ltr', duration: 172 },
  { dir: 'rtl', duration: 180 },
];

// 행마다 책 목록을 다르게 섞기
function getRowBooks(rowIndex) {
  const books = [...BOOK_COVERS];
  const offset = rowIndex * Math.floor(books.length / 6);
  return [...books.slice(offset), ...books.slice(0, offset)];
}

function MarqueeRow({ config, rowIndex }) {
  const books = getRowBooks(rowIndex);
  // 무한 루프를 위해 3배 복제
  const tripled = [...books, ...books, ...books];
  const isRtl = config.dir === 'rtl';

  return (
    <div className="marquee-row">
      <div
        className={`marquee-track ${isRtl ? 'rtl' : 'ltr'}`}
        style={{ animationDuration: `${config.duration}s` }}
        data-row={rowIndex}
      >
        {tripled.map((book, i) => (
          <BookCover key={`${rowIndex}-${i}`} book={book} />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection1() {
  const sectionRef = useRef(null);

  return (
    <section className="hero-section-1" ref={sectionRef} id="hero1">
      {/* 배경: 패턴 이미지 + 색상 오버레이 (분리) */}
      <div className="hero-bg-img" />
      <div className="hero-bg-color" style={{ '--pattern-color': '#FF8D28' }} />

      {/* 마키 행들 */}
      <div className="marquee-container">
        {ROW_CONFIG.map((config, i) => (
          <MarqueeRow key={i} config={config} rowIndex={i} />
        ))}
      </div>
    </section>
  );
}
