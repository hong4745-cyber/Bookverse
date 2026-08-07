import { useEffect, useState } from 'react';
import { createBookClubApplication } from '../services/applications';
import './BookClubModal.css';

export default function BookClubModal({ book, onClose }) {
  const [joined, setJoined] = useState(false);
  const [paid, setPaid] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleJoin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setResultMessage('');
    const form = new FormData(event.currentTarget);
    try {
      await createBookClubApplication({
        book,
        name: String(form.get('name') || ''),
        phone: String(form.get('phone') || ''),
        paid,
      });
      setResultMessage(paid ? '신청되었습니다.' : '입금 완료 후 신청이 완료됩니다.');
      setJoined(true);
    } catch (error) {
      setResultMessage(
        error.message === 'auth-required'
          ? '로그인 후 북클럽에 참여할 수 있습니다.'
          : '신청을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="book-club-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="book-club-modal__panel" role="dialog" aria-modal="true" aria-labelledby="book-club-title">
        <button type="button" className="book-club-modal__close" onClick={onClose} aria-label="상세 창 닫기">×</button>
        <div className="book-club-modal__cover">
          <span className="book-club-modal__eyebrow">THIS MONTH'S<br />BOOK CLUB</span>
          <img src={book.src} alt={`${book.title} 표지`} />
        </div>
        <div className="book-club-modal__content">
          <div className="book-club-modal__heading">
            <h2 id="book-club-title">{book.title}</h2>
            <p className="book-club-modal__author">{book.author}</p>
          </div>
          <p className="book-club-modal__description">{book.description}</p>
          <div className="book-club-modal__schedule">
            <span>BOOK CLUB DATE</span>
            <strong>{book.date}</strong>
            <small>BOOKCOVERS 다락 세미나실 · 정원 10명</small>
          </div>
          <form className="book-club-modal__form" onSubmit={handleJoin}>
            <div className="book-club-modal__fields">
              <input type="text" name="name" required placeholder="이름" aria-label="이름" disabled={joined} />
              <input type="tel" name="phone" required placeholder="연락처" aria-label="연락처" disabled={joined} />
            </div>
            <div className="book-club-modal__account">
              <span>BOOKCOVERS 입금 계좌</span>
              <strong>신한은행 110-000-000000</strong>
              <small>예금주: 북커버스</small>
            </div>
            <label className="book-club-modal__paid">
              <input
                type="checkbox"
                name="paid"
                checked={paid}
                onChange={(event) => setPaid(event.target.checked)}
                disabled={joined}
              />
              입금을 완료했습니다
            </label>
            <button type="submit" className={`book-club-modal__join ${joined ? 'is-joined' : ''}`} disabled={joined || submitting}>
              {submitting ? '신청 중...' : joined ? '참여 신청 완료' : '북클럽 참여하기'}
            </button>
            {resultMessage && (
              <p className="book-club-modal__result" role="status">{resultMessage}</p>
            )}
          </form>
        </div>
      </article>
    </div>
  );
}
