import { useState } from 'react';
import { SPACE_TAGS, SPACE_PHOTOS } from '../../data/spaceData';
import SpaceReservationModal from '../SpaceReservationModal';
import { DotClusterDeco } from '../deco/DecoIcons';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './SpaceSection.module.css';

export default function SpaceSection() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [headRef, headVisible] = useReveal();
  const [photosRef, photosVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();
  const featuredPhoto = SPACE_PHOTOS[0];
  const galleryPhotos = SPACE_PHOTOS.slice(1, 5);

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
          <h2 className={styles.headline}>
            북커<span className={styles.headlineGap}>버스 공간 소개</span>
          </h2>
          <div className={styles.tags}>
            <span>{SPACE_TAGS[0]}</span>
            <span className={styles.tagDash} aria-hidden="true" />
            <span>{SPACE_TAGS[1]}</span>
          </div>
        </div>

        <div
          ref={photosRef}
          className={`reveal ${photosVisible ? 'is-visible' : ''} ${styles.spaceGallery}`}
        >
          <article className={styles.reserveCard}>
            <div className={styles.featuredImage}>
              <img src={featuredPhoto.src} alt={featuredPhoto.alt} loading="lazy" />
            </div>
            <div className={styles.reserveContent}>
              <div>
                <span className={styles.reserveLabel}>SPACE RENTAL</span>
                <h3>BOOKCOVERS RESERVATION</h3>
                <p>책과 이야기가 머무는 아늑한 공간입니다. 독서 모임과 소규모 워크숍을 위해 예약해 보세요.</p>
              </div>
              <button type="button" className={styles.reserveButton} onClick={() => setReservationOpen(true)}>
                예약가능
              </button>
            </div>
          </article>

          <ul className={styles.photoGrid}>
            {galleryPhotos.map((photo) => (
              <li key={photo.id} className={styles.photoItem}>
                <div className={styles.photoImage}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <h4>{photo.title}</h4>
                <p>{photo.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {reservationOpen && <SpaceReservationModal onClose={() => setReservationOpen(false)} />}
    </section>
  );
}
