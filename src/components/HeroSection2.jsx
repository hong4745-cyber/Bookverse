import { BOOK_COVERS } from '../data/books';
import BookCover from './BookCover';
import usePatternOffset from '../hooks/usePatternOffset';
import './HeroSection2.css';

const ROW_CONFIG = [
  { dir: 'ltr', base: 160 },
  { dir: 'rtl', base: 160 },
  { dir: 'ltr', base: 160 },
  { dir: 'rtl', base: 160 },
  { dir: 'ltr', base: 160 },
  { dir: 'rtl', base: 160 },
];

function getRowBooks(rowIndex) {
  const books = [...BOOK_COVERS];
  const offset = rowIndex * Math.floor(books.length / 6);
  return [...books.slice(offset), ...books.slice(0, offset)];
}

export default function HeroSection2() {
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section className="hero-section-2" id="hero2" ref={sectionRef}>
      <div
        className="s2-bg-img"
        style={{ '--pattern-color': '#FFCC00', '--pattern-offset-y': `${-patternOffset}px` }}
      />

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

    </section>
  );
}
