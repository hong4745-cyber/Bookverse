import { SPACE_TAGS, SPACE_PHOTOS } from '../../data/spaceData';
import { DotClusterDeco } from '../deco/DecoIcons';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './SpaceSection.module.css';

export default function SpaceSection() {
  const [headRef, headVisible] = useReveal();
  const [photosRef, photosVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section id="space" className={styles.section} ref={sectionRef}>
      <div
        className={styles.pattern}
        style={{ '--pattern-color': '#2F80ED', '--pattern-offset-y': `${-patternOffset}px` }}
      />
      <div className={`inner ${styles.inner}`}>
        <div
          ref={headRef}
          className={`reveal ${headVisible ? 'is-visible' : ''} ${styles.head}`}
        >
          <DotClusterDeco className={styles.decoDots} />
          <span className={`eyebrow ${styles.eyebrow}`}>SPACE</span>
          <h2 className={styles.headline}>북커버스 공간 소개</h2>
          <div className={styles.tags}>
            <span>{SPACE_TAGS[0]}</span>
            <span className={styles.tagDash} aria-hidden="true" />
            <span>{SPACE_TAGS[1]}</span>
          </div>
        </div>

        <ul
          ref={photosRef}
          className={`reveal ${photosVisible ? 'is-visible' : ''} ${styles.photoRow}`}
        >
          {SPACE_PHOTOS.map((photo) => (
            <li key={photo.id} className={styles.photoItem}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
