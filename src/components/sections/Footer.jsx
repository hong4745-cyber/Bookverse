import { FOOTER_LINK_GROUPS } from '../../data/footerData';
import MagneticLink from '../MagneticLink';
import useReveal from '../../hooks/useReveal';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const [topRef, topVisible] = useReveal();
  const [barRef, barVisible] = useReveal();
  const [wordmarkRef, wordmarkVisible] = useReveal({ threshold: 0.1 });

  return (
    <footer className={styles.footer}>
      <div className={`inner ${styles.inner}`}>
        <div
          ref={topRef}
          className={`reveal ${topVisible ? 'is-visible' : ''} ${styles.top}`}
        >
          <p className={styles.brand}>
            북커버스는 한 권의 책에 담긴 독창적인 세계를 존중하며,
            <br />
            문장을 통한 지속 가능한 만남을 지향합니다.
          </p>

          <div className={styles.linkGroups}>
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.id} className={styles.linkGroup}>
                <p className={styles.linkTitle}>{group.title}</p>
                <ul className={styles.linkList}>
                  {group.links.map((link) => (
                    <li key={link}>
                      <MagneticLink href="#" className={styles.link}>
                        {link}
                      </MagneticLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={barRef}
          className={`reveal ${barVisible ? 'is-visible' : ''} ${styles.bottomBar}`}
        >
          <span>© {year} 북커버스. All rights reserved.</span>
          <span>서울에서 정성껏 만들었습니다.</span>
        </div>
      </div>

      <div
        ref={wordmarkRef}
        className={`${styles.wordmarkWrap} ${wordmarkVisible ? styles.wordmarkVisible : ''}`}
        aria-hidden="true"
      >
        <span className={styles.wordmark}>BOOKCOVERS</span>
      </div>
    </footer>
  );
}
