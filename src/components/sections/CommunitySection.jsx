import { REVIEWS } from '../../data/communityData';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './CommunitySection.module.css';

function StarRow() {
  return (
    <div className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="14" height="14">
          <path
            d="M10 1.5l2.53 5.13 5.66.82-4.1 4 .97 5.63L10 14.5l-5.06 2.66.97-5.63-4.1-4 5.66-.82z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <li
      className={`${styles.card} ${review.bg !== '#ffffff' ? styles.coloredCard : ''}`}
      style={{ background: review.bg, color: review.ink }}
    >
      <StarRow />
      <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
      <div className={styles.author}>
        <span className={styles.avatar}>{review.name[0]}</span>
        <div>
          <p className={styles.name}>{review.name}</p>
          <p className={styles.meta}>{review.meta}</p>
        </div>
      </div>
    </li>
  );
}

export default function CommunitySection() {
  const [headRef, headVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section id="community" className={styles.section} ref={sectionRef}>
      <div
        className={styles.pattern}
        style={{ '--pattern-color': '#CB30E0', '--pattern-offset-y': `${-patternOffset}px` }}
      />
      <div className={`${styles.decoClover} shape-deco-rotate`} />

      <div className={`inner ${styles.inner}`}>
        <div
          ref={headRef}
          className={`reveal ${headVisible ? 'is-visible' : ''} ${styles.head}`}
        >
          <span className={`eyebrow ${styles.eyebrow}`}>COMMUNITY</span>
          <h2 className={styles.headline}>
            우리 독자들의 <span className={styles.headlineAccent}>이야기</span>
          </h2>
        </div>

        <ul className={styles.grid}>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>

        <div className={styles.moreRow}>
          <a href="/community" className={styles.moreBtn}>
            더보기
          </a>
        </div>
      </div>
    </section>
  );
}
