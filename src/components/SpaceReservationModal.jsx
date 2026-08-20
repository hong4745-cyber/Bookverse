import { useEffect, useState } from 'react';
import { createSpaceReservation } from '../services/applications';
import './SpaceReservationModal.css';

export default function SpaceReservationModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError('');
    const form = new FormData(event.currentTarget);
    try {
      await createSpaceReservation({
        name: String(form.get('name') || ''),
        phone: String(form.get('phone') || ''),
        date: String(form.get('date') || ''),
        time: String(form.get('time') || ''),
        people: String(form.get('people') || ''),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('공간 예약 저장 실패', error);
      setSubmitError(
        error.message === 'auth-required'
          ? '로그인 후 공간을 예약할 수 있습니다.'
          : '예약을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-reservation" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="space-reservation__panel" role="dialog" aria-modal="true" aria-labelledby="space-reservation-title">
        <button type="button" className="space-reservation__close" onClick={onClose} aria-label="예약 창 닫기">×</button>
        {submitted ? (
          <div className="space-reservation__complete">
            <span>✓</span>
            <h2>예약 요청이 완료됐어요</h2>
            <p>확인 후 입력하신 연락처로 안내드리겠습니다.</p>
            <button type="button" onClick={onClose}>확인</button>
          </div>
        ) : (
          <>
            <span className="space-reservation__eyebrow">SPACE RENTAL</span>
            <h2 id="space-reservation-title">BOOKCOVERS RESERVATION</h2>
            <p className="space-reservation__intro">독서 모임과 소규모 워크숍을 위한 공간을 예약해 보세요.</p>
            <form onSubmit={handleSubmit}>
              <label>예약자 이름<input name="name" type="text" required placeholder="이름을 입력하세요" /></label>
              <label>연락처<input name="phone" type="tel" required placeholder="010-0000-0000" /></label>
              <div className="space-reservation__row">
                <label>예약 날짜<input name="date" type="date" required min={new Date().toISOString().slice(0, 10)} /></label>
                <label>예약 시간<select name="time" required defaultValue=""><option value="" disabled>시간 선택</option><option>10:00</option><option>13:00</option><option>16:00</option><option>19:00</option></select></label>
              </div>
              <label>이용 인원<select name="people" required defaultValue=""><option value="" disabled>인원 선택</option><option>2명</option><option>3~4명</option><option>5~6명</option><option>7~10명</option></select></label>
              <button type="submit" className="space-reservation__submit" disabled={submitting}>
                {submitting ? '예약 저장 중...' : '예약 요청하기'}
              </button>
              {submitError && <p className="space-reservation__error" role="alert">{submitError}</p>}
            </form>
          </>
        )}
      </section>
    </div>
  );
}
