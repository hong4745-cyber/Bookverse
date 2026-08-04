// Small hand-drawn geometric decorations, all inline SVG (no image assets).
// Each accepts standard className/style so sections can position + color them.

export function CloverDeco({ className, style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <circle cx="50" cy="27" r="27" fill="currentColor" />
      <circle cx="73" cy="50" r="27" fill="currentColor" />
      <circle cx="50" cy="73" r="27" fill="currentColor" />
      <circle cx="27" cy="50" r="27" fill="currentColor" />
    </svg>
  );
}

export function SparkleDeco({ className, style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        d="M50 0 C54 34 66 46 100 50 C66 54 54 66 50 100 C46 66 34 54 0 50 C34 46 46 34 50 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FlowerDeco({ className, style }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      {petals.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + Math.sin(rad) * 24;
        const cy = 50 - Math.cos(rad) * 24;
        return <circle key={angle} cx={cx} cy={cy} r="22" fill="currentColor" />;
      })}
    </svg>
  );
}

export function DotClusterDeco({ className, style }) {
  const dots = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      {dots.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + Math.sin(rad) * 26;
        const cy = 50 - Math.cos(rad) * 26;
        return <circle key={angle} cx={cx} cy={cy} r="13" fill="currentColor" />;
      })}
    </svg>
  );
}

export function PillDeco({ className, style }) {
  return (
    <svg viewBox="0 0 100 60" className={className} style={style} aria-hidden="true">
      <circle cx="30" cy="30" r="30" fill="currentColor" />
      <circle cx="70" cy="30" r="30" fill="currentColor" />
    </svg>
  );
}

export function BurstDeco({ className, style, lines = 12 }) {
  const items = Array.from({ length: lines }, (_, i) => (360 / lines) * i);
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      {items.map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2="50"
          y2="4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

export function DotGridDeco({ className, style, cols = 5, rows = 5 }) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={(100 / (cols - 1)) * c}
          cy={(100 / (rows - 1)) * r}
          r="3"
          fill="currentColor"
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      {dots}
    </svg>
  );
}
