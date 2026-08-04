import { PROGRAMS } from '../../data/programsData';
import useReveal from '../../hooks/useReveal';
import usePatternOffset from '../../hooks/usePatternOffset';
import styles from './ProgramsSection.module.css';

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6v4l2.6 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 16c.6-2.8 2.6-4.3 5-4.3s4.4 1.5 5 4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14.5" cy="7.6" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13 11.9c1.9.1 3.3 1.4 3.8 3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ProgramCard({ program }) {
  return (
    <li className={styles.card}>
      <span className={styles.schedule}>{program.schedule}</span>
      <h3 className={styles.title}>
        {program.title.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h3>
      <p className={styles.cardDesc}>
        {program.desc.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className={styles.pills}>
        <span className={styles.pill}>
          <ClockIcon /> {program.duration}
        </span>
        <span className={styles.pill}>
          <PeopleIcon /> {program.capacity}
        </span>
      </div>
      <button type="button" className={styles.applyBtn}>
        신청하기
      </button>
    </li>
  );
}

export default function ProgramsSection() {
  const [headRef, headVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [sectionRef, patternOffset] = usePatternOffset();

  return (
    <section id="programs" className={styles.section} ref={sectionRef}>
      <div
        className={styles.pattern}
        style={{ '--pattern-color': '#34C759', '--pattern-offset-y': `${-patternOffset}px` }}
      />
      <div className={styles.decoStar} />
      <div className={styles.decoDots} />
      <div className={`inner ${styles.inner}`}>
        <div
          ref={headRef}
          className={`reveal ${headVisible ? 'is-visible' : ''} ${styles.head}`}
        >
          <span className={`eyebrow ${styles.eyebrow}`}>PROGRAMS</span>
          <h2 className={styles.headline}>이번 달 프로그램 일정</h2>
          <p className={styles.desc}>
            매월 새로운 주제의 북 토크, 심야 독서회, 나만의 독립출판물 만들기 클래스가 열립니다.
            <br />
            책 뒤에 숨겨진 서사와 사람을 만나는 자리에 함께하세요.
          </p>
        </div>

        <div className={styles.subcopyRow}>
          <p className={styles.subcopy}>
            관점이 담긴 책을
            <br />
            <span className={styles.subcopyAccent}>선별합니다.</span>
          </p>
        </div>

        <ul
          ref={gridRef}
          className={`reveal ${gridVisible ? 'is-visible' : ''} ${styles.grid}`}
        >
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </ul>
      </div>
    </section>
  );
}
