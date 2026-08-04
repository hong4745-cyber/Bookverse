import { SPACE_TAGS, SPACE_PHOTOS, SPACE_INFO } from '../../data/spaceData';
import { DotClusterDeco } from '../deco/DecoIcons';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './SpaceSection.module.css';

export default function SpaceSection() {
  const [headRef, headVisible] = useReveal();
  const [photosRef, photosVisible] = useReveal();
  const [infoRef, infoVisible] = useReveal();
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
          {SPACE_PHOTOS.map((photo, i) => (
            <li key={photo.id} className={styles.photoItem} data-offset={i % 2}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </li>
          ))}
        </ul>

        <ul
          ref={infoRef}
          className={`reveal ${infoVisible ? 'is-visible' : ''} ${styles.infoRow}`}
        >
          {SPACE_INFO.map((col) => (
            <li key={col.id} className={styles.infoCol}>
              <p className={styles.infoLabel}>{col.label}</p>
              {col.lines.map((line) => (
                <p key={line} className={styles.infoLine}>
                  {line}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
