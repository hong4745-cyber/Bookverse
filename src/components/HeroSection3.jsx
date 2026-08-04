import { useState } from 'react';
import { BOOK_COVERS, SELECTED_BOOK_IDS, CURATED_BOOKS } from '../data/books';
import BookCover from './BookCover';
import VideoModal from './VideoModal';
import CircularText from './CircularText';
import usePatternOffset from '../hooks/usePatternOffset';
import './HeroSection3.css';

const TOP_ROWS = [
  { dir: 'ltr', base: 280 },
  { dir: 'rtl', base: 310 },
  { dir: 'ltr', base: 330 },
];

const BOTTOM_ROWS = [
  { dir: 'rtl', base: 316 },
  { dir: 'ltr', base: 344 },
  { dir: 'rtl', base: 360 },
];

function getRowBooks(rowIndex) {
  const books = [...BOOK_COVERS];
  const offset = rowIndex * Math.floor(books.length / 6);
  return [...books.slice(offset), ...books.slice(0, offset)];
}

const selectedIds = new Set(SELECTED_BOOK_IDS);

function makeRows(configs, startIdx) {
  return configs.map((config, i) => {
    const rowIdx = startIdx + i;
    const books  = getRowBooks(rowIdx);
    const tripled = [...books, ...books, ...books];
    return (
      <div className="s3-marquee-row" key={rowIdx}>
        <div
          className={`s3-marquee-track ${config.dir === 'rtl' ? 'rtl' : 'ltr'}`}
          style={{ animationDuration: `${config.base}s`, opacity: 0.15 }}
        >
          {tripled.map((book, j) => {
            const isSel = selectedIds.has(book.id);
            return (
              <div
                key={`s3-${rowIdx}-${j}`}
                className={`s3-book-wrap ${isSel ? 'selected' : 'non-selected'}`}
                style={isSel ? { opacity: 0.15, filter: 'blur(1px)' } : {}}
              >
                <BookCover book={book} />
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}

export default function HeroSection3() {
  const [activeBook, setActiveBook] = useState(null);
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section
      className="hero-section-3"
      id="hero3"
      ref={sectionRef}
      style={{ '--pattern-color': '#34C759', '--pattern-offset-y': `${-patternOffset}px` }}
    >
      <div className="s3-bg-img" />

      {/* 커튼 위쪽 (rows 0–2) */}
      <div className="s3-curtain-top">
        {makeRows(TOP_ROWS, 0)}
      </div>

      {/* 커튼 아래쪽 (rows 3–5) */}
      <div className="s3-curtain-bottom">
        {makeRows(BOTTOM_ROWS, 3)}
      </div>

      {/* 중앙 선택 도서 스테이지 */}
      <div className="s3-center-stage">
        <div className="inner s3-stage-inner">
          <div className="s3-curation-text">
            <p className="s3-curation-line-1">수백 권 중의 책중,</p>
            <p className="s3-curation-line-2">우리가 고른 오늘의 이야기</p>
          </div>
          <div className="s3-books-row">
            {CURATED_BOOKS.map((book) => (
              <div
                key={book.id}
                className="s3-center-book"
                onClick={() => setActiveBook(book)}
              >
                <BookCover book={book} />
                <div className="s3-play-icon" aria-hidden="true">
                  <CircularText
                    text="BOOKVERSE*BOOKVERSE*"
                    onHover="speedUp"
                    spinDuration={16}
                    className="s3-play-circular-text"
                  />
                  <svg className="s3-play-arrow" viewBox="0 0 52 52" width="52" height="52">
                    <polygon points="22,17 38,26 22,35" fill="#000" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeBook && (
        <VideoModal book={activeBook} onClose={() => setActiveBook(null)} />
      )}
    </section>
  );
}
