import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ApplyModal.module.css';

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12.5 10 16.5 18 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DEFAULT_LOCATION = '2층 북라운지';

export default function ApplyModal({ program, onClose }) {
  const [step, setStep] = useState('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('success');
  };

  const programTitle = program ? program.title.replace(/\n/g, ' ') : '';

  const modal = (
    <div className={styles.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
        <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
          <CloseIcon />
        </button>

        {step === 'form' ? (
          <>
            <h2 id="apply-modal-title" className={styles.title}>
              {program ? `${programTitle} 신청` : '프로그램 신청'}
            </h2>
            <p className={styles.subtitle}>
              책방 프로그램 예약을 위해 신청 정보를 작성해 주세요.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="apply-name">
                  이름 (Name) <span className={styles.required}>*</span>
                </label>
                <input
                  id="apply-name"
                  type="text"
                  className={styles.input}
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="apply-phone">
                  연락처 (Phone) <span className={styles.required}>*</span>
                </label>
                <input
                  id="apply-phone"
                  type="tel"
                  className={styles.input}
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <span className={styles.label}>
                  입금여부 (Payment status) <span className={styles.required}>*</span>
                </span>
                <div className={styles.payRow}>
                  <button
                    type="button"
                    className={`${styles.payOption} ${!paid ? styles.payOptionActive : ''}`}
                    onClick={() => setPaid(false)}
                    aria-pressed={!paid}
                  >
                    <span className={styles.payDot}>{!paid && <CheckDot />}</span>
                    미입금
                  </button>
                  <button
                    type="button"
                    className={`${styles.payOption} ${paid ? styles.payOptionActive : ''}`}
                    onClick={() => setPaid(true)}
                    aria-pressed={paid}
                  >
                    <span className={styles.payDot}>{paid && <CheckDot />}</span>
                    입금완료
                  </button>
                </div>
              </div>

              <div className={styles.footer}>
                <button type="button" className={styles.cancelBtn} onClick={onClose}>
                  취소
                </button>
                <button type="submit" className={styles.submitBtn}>
                  프로그램 신청하기 <ArrowIcon />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <span className={styles.successIcon}>
              <CheckCircleIcon />
            </span>
            <h2 id="apply-modal-title" className={styles.successTitle}>
              프로그램 신청이 완료되었습니다
            </h2>
            <p className={styles.successDesc}>신청하신 프로그램의 확정 안내를 드립니다.</p>

            <dl className={styles.summary}>
              <div className={styles.summaryRow}>
                <dt>프로그램명</dt>
                <dd>{programTitle}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>일시</dt>
                <dd>{program?.schedule}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>장소</dt>
                <dd>{DEFAULT_LOCATION}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>신청자</dt>
                <dd>{name}</dd>
              </div>
            </dl>

            <p className={styles.successNote}>
              신청 확인 메일이 발송되었습니다. 취소는 프로그램 시작 24시간 전까지 가능합니다.
            </p>

            <div className={styles.successFooter}>
              <button type="button" className={styles.submitBtn} onClick={onClose}>
                확인
              </button>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                나의 신청 내역 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function CheckDot() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
      <path d="M1 3.5 3.2 5.7 8 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
