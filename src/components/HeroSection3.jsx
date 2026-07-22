import { BOOK_COVERS, SELECTED_BOOK_IDS, CURATED_BOOKS } from '../data/books';
import BookCover from './BookCover';
import './HeroSection3.css';

const ROW_CONFIG = [
  { dir: 'ltr', base: 280 },
  { dir: 'rtl', base: 310 },
  { dir: 'ltr', base: 330 },
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

export default function HeroSection3() {
  return (
    <section className="hero-section-3" id="hero3">
      <div className="s3-bg-img" />
      <div className="s3-bg-color" style={{ '--pattern-color': '#34C759' }} />

      {/* STEP02 잔상 텍스트 */}
      <div className="s3-step2-text">
        <div className="inner">
          <p className="s3-small-title">INDEPENDENT BOOKSHOP</p>
          <div className="s3-main-heading">
            <span>BOOKS</span>
            <span>SELECTED</span>
            <span>WITH A POINT</span>
            <span>OF VIEW.</span>
          </div>
        </div>
      </div>

      {/* 마키 레이어 */}
      <div className="s3-marquee-layer">
        <div className="s3-marquee-container">
          {ROW_CONFIG.map((config, rowIdx) => {
            const books = getRowBooks(rowIdx);
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
          })}
        </div>
      </div>

      {/* 중앙 선택 도서 스테이지 */}
      <div className="s3-center-stage">
        <div className="s3-curation-text">
          <p className="s3-curation-line-1">수백 권 중의 책중,</p>
          <p className="s3-curation-line-2">우리가 고른 오늘의 이야기</p>
        </div>
        <div className="s3-books-row">
          {CURATED_BOOKS.map((book) => (
            <div key={book.id} className="s3-center-book">
              <BookCover book={book} />
            </div>
          ))}
        </div>

        <div className="s3-deco s3-deco-left" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="80" height="80">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx="40" cy="40" rx="12" ry="26"
                fill="#7c3aed" opacity="0.7"
                transform={`rotate(${a} 40 40)`} />
            ))}
            <circle cx="40" cy="40" r="8" fill="#4c1d95" />
          </svg>
        </div>
        <div className="s3-deco s3-deco-right" aria-hidden="true">
          <svg viewBox="0 0 70 56" width="90" height="72">
            <ellipse cx="21" cy="20" rx="20" ry="16" fill="#b5f542" opacity="0.9" transform="rotate(-25 21 20)" />
            <ellipse cx="49" cy="20" rx="20" ry="16" fill="#b5f542" opacity="0.9" transform="rotate(25 49 20)" />
            <ellipse cx="17" cy="40" rx="13" ry="10" fill="#86ef2e" opacity="0.8" transform="rotate(-15 17 40)" />
            <ellipse cx="53" cy="40" rx="13" ry="10" fill="#86ef2e" opacity="0.8" transform="rotate(15 53 40)" />
            <path d="M35 14 Q36 28 35 44 Q34 28 35 14" fill="#1a1a1a" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
