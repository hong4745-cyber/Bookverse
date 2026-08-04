import styles from './SubwayMap.module.css';

const LANDMARKS = [
  { id: 'lm-1', x: 340, y: 96, label: '스타벅스' },
  { id: 'lm-2', x: 214, y: 268, label: '롯데호텔' },
  { id: 'lm-3', x: 268, y: 268, label: '롯데백화점' },
  { id: 'lm-4', x: 322, y: 300, label: '농협' },
  { id: 'lm-5', x: 388, y: 300, label: '스타벅스' },
];

export default function SubwayMap() {
  return (
    <svg
      viewBox="0 0 520 480"
      className={styles.map}
      role="img"
      aria-label="북커버스 오시는 길 약도: 3호선 안국역 1번 출구에서 도보 5분"
    >
      {/* 배경 도로 그리드 */}
      <g className={styles.roadGrid}>
        {[80, 170, 260, 350, 440].map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="480" />
        ))}
        {[60, 150, 240, 330, 420].map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="520" y2={y} />
        ))}
      </g>

      {/* 노선 2개 */}
      <line x1="20" y1="196" x2="500" y2="196" className={styles.linePink} />
      <path d="M 470 20 L 400 190 L 400 460" className={styles.lineBlue} fill="none" />

      {/* 랜드마크 */}
      {LANDMARKS.map((lm) => (
        <g key={lm.id}>
          <rect x={lm.x - 7} y={lm.y - 7} width="14" height="14" className={styles.landmark} />
          <text x={lm.x} y={lm.y + 26} textAnchor="middle" className={styles.landmarkLabel}>
            {lm.label}
          </text>
        </g>
      ))}

      {/* 목적지: 북커버스 */}
      <circle cx="150" cy="330" r="46" className={styles.destination} />
      <text x="150" y="326" textAnchor="middle" className={styles.destinationTitle}>
        BOOKCOVERS
      </text>
      <text x="150" y="342" textAnchor="middle" className={styles.destinationSub}>
        YOU ARE WELCOME
      </text>

      {/* 역 노드: 안국역 */}
      <circle cx="400" cy="196" r="38" className={styles.station} />
      <text x="400" y="201" textAnchor="middle" className={styles.stationLabel}>
        안국역
      </text>
    </svg>
  );
}
