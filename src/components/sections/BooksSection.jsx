import { useState } from 'react';
import { BOOK_CLUB_BOOKS } from '../../data/booksData';
import { SparkleDeco } from '../deco/DecoIcons';
import BookClubModal from '../BookClubModal';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './BooksSection.module.css';

function ClubCard({ book, onSelect }) {
  return (
    <li className={styles.clubCard}>
      <button type="button" className={styles.clubCover} onClick={() => onSelect(book)} aria-label={`${book.title} 북클럽 상세 보기`}>
        <img src={book.src} alt={`${book.title} 표지`} loading="lazy" />
      </button>
      <p className={styles.cardTitleSm}>{book.title}</p>
      <p className={styles.cardAuthorSm}>{book.author}</p>
    </li>
  );
}

export default function BooksSection() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [clubRef, clubVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section id="books" className={styles.section} ref={sectionRef}>
      <div
        className={styles.pattern}
        style={{ '--pattern-color': '#FFCC00', '--pattern-offset-y': `${-patternOffset}px` }}
      />
      <div className={`inner ${styles.inner}`}>
        <SparkleDeco className={styles.decoSparkle} />
        <div className={styles.clubBlock}>
          <span className={`eyebrow ${styles.eyebrow}`}>book</span>
          <h3 className={styles.subhead}>THIS MONTH'S BOOK CLUB</h3>
          <p className={styles.desc}>
            독립서점 북커버스가 이달의 주제로 엄선한 책들을 소개합니다.
            <br />
            매달 새로운 시선으로 고른 이야기들을 만나보세요.
          </p>
          <ul
            ref={clubRef}
            className={`reveal ${clubVisible ? 'is-visible' : ''} ${styles.clubGrid}`}
          >
            {BOOK_CLUB_BOOKS.map((book) => (
              <ClubCard key={book.id} book={book} onSelect={setSelectedBook} />
            ))}
          </ul>
        </div>
      </div>
      {selectedBook && <BookClubModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </section>
  );
}
