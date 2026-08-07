import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import './AuthModal.css';

const AUTH_ERRORS = {
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/invalid-credential': '이메일 또는 비밀번호를 확인해 주세요.',
  'auth/invalid-email': '올바른 이메일을 입력해 주세요.',
  'auth/weak-password': '비밀번호는 6자 이상 입력해 주세요.',
  'auth/too-many-requests': '요청이 많습니다. 잠시 후 다시 시도해 주세요.',
  'auth/network-request-failed': '네트워크 연결을 확인해 주세요.',
  'auth/operation-not-allowed': 'Firebase에서 이메일/비밀번호 로그인을 활성화해 주세요.',
};

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === 'signup';

  useEffect(() => {
    const handleKeyDown = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isSignup && password !== confirmPassword) {
      setError('비밀번호가 서로 일치하지 않습니다.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      onClose();
    } catch (authError) {
      setError(AUTH_ERRORS[authError.code] || '처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div className="auth-modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal__panel" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button type="button" className="auth-modal__close" onClick={onClose} aria-label="로그인 창 닫기">×</button>
        <p className="auth-modal__eyebrow">BOOKCOVERS MEMBER</p>
        <h2 id="auth-modal-title">{isSignup ? '회원가입' : '로그인'}</h2>
        <p className="auth-modal__intro">
          {isSignup ? '북커버스의 새로운 독자가 되어보세요.' : '다시 만나서 반가워요.'}
        </p>

        <div className="auth-modal__tabs" role="tablist" aria-label="회원 메뉴">
          <button type="button" className={!isSignup ? 'is-active' : ''} onClick={() => switchMode('login')}>로그인</button>
          <button type="button" className={isSignup ? 'is-active' : ''} onClick={() => switchMode('signup')}>회원가입</button>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              <span>이름</span>
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="이름" required />
            </label>
          )}
          <label>
            <span>이메일</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="hello@bookcovers.kr" required />
          </label>
          <label>
            <span>비밀번호</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="6자 이상 입력" minLength={6} required />
          </label>
          {isSignup && (
            <label>
              <span>비밀번호 확인</span>
              <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" placeholder="비밀번호 다시 입력" minLength={6} required />
            </label>
          )}
          {error && <p className="auth-modal__error" role="alert">{error}</p>}
          <button type="submit" className="auth-modal__submit" disabled={submitting}>
            {submitting ? '처리 중...' : isSignup ? '회원가입하기' : '로그인하기'}
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}
