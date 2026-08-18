import { BOOK_COVERS } from '../data/books';
import BookCover from './BookCover';
import usePatternOffset from '../hooks/usePatternOffset';
import './HeroSection1.css';

// 6개 행: 방향 및 속도 설정
const ROW_CONFIG = [
  { dir: 'ltr', duration: 160 },
  { dir: 'rtl', duration: 160 },
  { dir: 'ltr', duration: 160 },
  { dir: 'rtl', duration: 160 },
  { dir: 'ltr', duration: 160 },
  { dir: 'rtl', duration: 160 },
];

const TEXT_MARQUEE_ITEMS = ['READ', 'DISCOVER', 'CONNECT', 'BOOKVERSE'];
const TEXT_MARQUEE_COLORS = ['#22a447', '#ff8d28', '#2357ff'];

// 행마다 책 목록을 다르게 섞기
function getRowBooks(rowIndex) {
  const books = [...BOOK_COVERS];
  const offset = rowIndex * Math.floor(books.length / 6);
  return [...books.slice(offset), ...books.slice(0, offset)];
}

function MarqueeRow({ config, rowIndex }) {
  if (rowIndex % 2 === 0) {
    const repeatedText = Array.from({ length: 6 }, () => TEXT_MARQUEE_ITEMS).flat();
    const symbolColor = TEXT_MARQUEE_COLORS[rowIndex / 2];

    return (
      <div className="marquee-row marquee-text-row" aria-label="READ, DISCOVER, CONNECT, BOOKVERSE">
        <div
          className="text-marquee-track ltr"
          style={{ animationDuration: `${config.duration}s`, '--symbol-color': symbolColor }}
          data-row={rowIndex}
        >
          {repeatedText.map((text, i) => (
            <span className="text-marquee-item" key={`${text}-${i}`} aria-hidden="true">
              {text}<span className="text-marquee-symbol">✦</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

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
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section className="hero-section-1" ref={sectionRef} id="hero1">
      {/* 배경: 패턴 모양에만 색상 적용, 배경은 투명. 문서 절대좌표 기준으로 섹션 경계 없이 이어짐 */}
      <div
        className="hero-bg-img"
        style={{ '--pattern-color': '#FF8D28', '--pattern-offset-y': `${-patternOffset}px` }}
      />

      {/* 마키 행들 */}
      <div className="marquee-container">
        {ROW_CONFIG.map((config, i) => (
          <MarqueeRow key={i} config={config} rowIndex={i} />
        ))}
      </div>

    </section>
  );
}
