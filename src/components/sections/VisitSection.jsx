import { VISIT_INFO_ROWS } from '../../data/visitData';
import { BurstDeco } from '../deco/DecoIcons';
import SubwayMap from './SubwayMap';
import TextLoop from '../TextLoop';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './VisitSection.module.css';

function MixedLine({ text }) {
  let solid = true;
  return (
    <>
      {text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        const className = solid ? styles.solidChar : styles.outlineChar;
        solid = !solid;
        return (
          <span key={i} className={className}>
            {char}
          </span>
        );
      })}
    </>
  );
}

export default function VisitSection() {
  const [contentRef, contentVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section className={styles.section} ref={sectionRef}>
      <div
        className={styles.pattern}
        style={{ '--pattern-color': '#6155F5', '--pattern-offset-y': `${-patternOffset}px` }}
      />
      <BurstDeco className={`${styles.decoBurst} shape-deco-rotate`} />

      <div className={styles.loopBanner}>
        <TextLoop
          text="BOOKCOVERS"
          shape="wave"
          speed={45}
          separator="✦"
          curviness={35}
          fontSize={28}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#0057D9"
          ribbonWidth={55}
          pauseOnHover
          style={{ height: 220, display: 'flex', alignItems: 'center' }}
        />
      </div>

      <div className={styles.loopBanner}>
        <TextLoop
          text="BOOKCOVERS"
          shape="wave"
          speed={45}
          direction="reverse"
          separator="✦"
          curviness={35}
          fontSize={28}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#EC4899"
          ribbonWidth={55}
          pauseOnHover
          style={{ height: 220, display: 'flex', alignItems: 'center' }}
        />
      </div>

      <div id="visit" className={`inner ${styles.inner}`}>
        <span className={`eyebrow ${styles.eyebrow}`}>VISIT BOOKCOVERSE</span>
        <h2 className={styles.giant}>
          <span className={styles.giantLine}>COME IN,</span>
          <span className={styles.giantLine}>
            <MixedLine text="STAY A WHILE" />
          </span>
        </h2>

        <p className={styles.caption}>책이 필요할 때 천천히 들러주세요.</p>

        <div
          ref={contentRef}
          className={`reveal ${contentVisible ? 'is-visible' : ''} ${styles.content}`}
        >
          <div className={styles.left}>
            <dl className={styles.table}>
              {VISIT_INFO_ROWS.map((row) => (
                <div key={row.id} className={styles.row}>
                  <dt className={styles.rowLabel}>{row.label}</dt>
                  <dd className={styles.rowValue}>
                    {row.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.right}>
            <SubwayMap />
          </div>
        </div>
      </div>
    </section>
  );
}
