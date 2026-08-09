import { CURATION_BOOKS, CURATORS } from '../../data/curationData';
import { SparkleDeco } from '../deco/DecoIcons';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './CurationSection.module.css';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.3" cy="5.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M17 5.3c-.6.3-1.2.5-1.9.6a3.3 3.3 0 0 0 1.5-1.8c-.6.4-1.4.7-2.1.8a3.3 3.3 0 0 0-5.6 3 9.3 9.3 0 0 1-6.8-3.4 3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4v.1c0 1.6 1.2 3 2.7 3.3-.5.1-1 .2-1.5.1.4 1.4 1.7 2.3 3.2 2.4A6.7 6.7 0 0 1 2 15.6a9.3 9.3 0 0 0 5 1.5c6 0 9.3-5 9.3-9.3v-.4c.6-.5 1.2-1.1 1.7-1.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CuratorCard({ curator }) {
  return (
    <li className={styles.curatorCard}>
      <div className={styles.curatorHead}>
        <img className={styles.avatar} src={curator.avatarSrc} alt={`${curator.name} 프로필`} loading="lazy" />
        <div>
          <p className={styles.curatorName}>{curator.name}</p>
          <p className={styles.curatorRole}>{curator.role}</p>
        </div>
      </div>
      <p className={styles.curatorBio}>{curator.bio}</p>
      <div className={styles.socialRow}>
        <button type="button" className={styles.socialBtn} aria-label={`${curator.name} 인스타그램`}>
          <InstagramIcon />
        </button>
        <button type="button" className={styles.socialBtn} aria-label={`${curator.name} 트위터`}>
          <TwitterIcon />
        </button>
      </div>
    </li>
  );
}

export default function CurationSection() {
  const [headRef, headVisible] = useReveal();
  const [bodyRef, bodyVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section id="curation" className={styles.section} ref={sectionRef}>
      <div
        className={styles.pattern}
        style={{ '--pattern-color': '#FF7A45', '--pattern-offset-y': `${-patternOffset}px` }}
      />
      <div className={`inner ${styles.inner}`}>
        <div
          ref={headRef}
          className={`reveal ${headVisible ? 'is-visible' : ''} ${styles.head}`}
        >
          <span className={`eyebrow ${styles.eyebrow}`}>CURATION</span>
          <h2 className={styles.headline}>7월의 큐레이션: 느린 여행자의 서재</h2>
          <p className={styles.desc}>
            여행은 장소의 이동이 아니라, 시간을 느리게 만드는 일입니다.
            <br />
            이번 달은 '느린 여행자의 서재'를 주제로, 길 위의 문장과 풍경을 담은 도서를 소개합니다.
          </p>
        </div>

        <div
          ref={bodyRef}
          className={`reveal ${bodyVisible ? 'is-visible' : ''} ${styles.body}`}
        >
          <div className={styles.colCopy}>
            <SparkleDeco className={`${styles.decoSparkle} shape-deco-rotate`} />
            <p className={styles.copy}>
              길 위에서 발견한
              <br />
              <span className={styles.copyAccent}>문장과 풍경</span>
            </p>
            <p className={styles.blurb}>
              느린 여행자의 서재에서
              <br />
              엄선한 추천 도서 3권.
            </p>
          </div>

          <div className={styles.colBooks}>
            <p className={styles.colLabel}>추천 도서 3권</p>
            <ul className={styles.bookList}>
              {CURATION_BOOKS.map((book) => (
                <li key={book.id} className={styles.bookItem}>
                  <img className={styles.bookThumb} src={book.src} alt={`${book.title} 표지`} loading="lazy" />
                  <div>
                    <p className={styles.bookTitle}>{book.title}</p>
                    <p className={styles.bookAuthor}>{book.author}</p>
                    <p className={styles.bookComment}>
                      {book.comment.split('\n').map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.colCurators}>
            <p className={styles.colLabel}>CURATION</p>
            <ul className={styles.curatorList}>
              {CURATORS.map((curator) => (
                <CuratorCard key={curator.id} curator={curator} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
