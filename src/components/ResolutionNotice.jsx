import { useState } from 'react';
import './ResolutionNotice.css';

const RESOLUTION_NOTICE_HIDDEN_UNTIL_KEY = 'resolutionNoticeHiddenUntil';
const TWELVE_HOURS_IN_MS = 12 * 60 * 60 * 1000;

const shouldShowNotice = () => {
  try {
    const hiddenUntil = Number(window.localStorage.getItem(RESOLUTION_NOTICE_HIDDEN_UNTIL_KEY));
    return !Number.isFinite(hiddenUntil) || hiddenUntil <= Date.now();
  } catch {
    return true;
  }
};

const MonitorIcon = () => (
  <img className="resolution-notice__monitor" src="/images/lcd_5164148.svg" alt="" aria-hidden="true" />
);

const FeatureIcon = ({ type }) => (
  <svg className="resolution-notice__feature-icon" viewBox="0 0 48 48" aria-hidden="true">
    {type === 'lcd' && <><rect x="6" y="8" width="36" height="25" rx="2" /><path d="M6 28h36M17 40h14M20 33v7M28 33v7" /></>}
    {type === 'inch' && <><rect x="6" y="8" width="36" height="25" rx="2" /><path d="m11 29 26-17M12 23l-1 6 6-1M31 13l6-1-1 6M18 33v6M30 33v6M14 39h20" /></>}
    {type === 'zoom' && <><circle cx="21" cy="21" r="12" /><path d="M21 16v10M16 21h10M30 30l9 9" /></>}
  </svg>
);

export default function ResolutionNotice() {
  const [open, setOpen] = useState(shouldShowNotice);
  if (!open) return null;

  const close = () => setOpen(false);
  const hideForTwelveHours = () => {
    try {
      window.localStorage.setItem(
        RESOLUTION_NOTICE_HIDDEN_UNTIL_KEY,
        String(Date.now() + TWELVE_HOURS_IN_MS),
      );
    } catch {
      // The notice can still be closed when browser storage is unavailable.
    }
    close();
  };

  return (
    <div className="resolution-notice" role="presentation">
      <section className="resolution-notice__card" role="dialog" aria-modal="true" aria-labelledby="resolution-title">
        <button className="resolution-notice__close" type="button" aria-label="팝업 닫기" onClick={close}>×</button>
        <MonitorIcon />
        <h2 id="resolution-title">1920 × 1080</h2>
        <strong>이 포트폴리오는 <span>1920 × 1080</span><br />해상도에 최적화되어 제작되었습니다.</strong>
        <p>최적의 화면 구성을 위해<br />브라우저 100% 확대 / 16:9 비율을 권장합니다.</p>

        <div className="resolution-notice__features">
          <div>
            <FeatureIcon type="lcd" />
            <b>1920 × 1080</b>
            <span>해상도 지원</span>
          </div>
          <div>
            <FeatureIcon type="inch" />
            <b>16 : 9 비율</b>
            <span>화면 최적화</span>
          </div>
          <div>
            <FeatureIcon type="zoom" />
            <b>배율 100%</b>
            <span>브라우저 권장</span>
          </div>
        </div>

        <div className="resolution-notice__actions">
          <button className="resolution-notice__confirm" type="button" onClick={close}>확인했습니다</button>
          <button className="resolution-notice__snooze" type="button" onClick={hideForTwelveHours}>12시간 동안 보지 않기</button>
        </div>
      </section>
    </div>
  );
}
