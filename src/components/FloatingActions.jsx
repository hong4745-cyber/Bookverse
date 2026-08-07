import { useEffect, useRef, useState } from 'react';
import './FloatingActions.css';

const QUICK_REPLIES = {
  '운영 시간이 궁금해요': 'BOOKCOVERS는 매일 오전 10시부터 오후 9시까지 운영합니다.',
  '프로그램을 신청하고 싶어요': '메인 페이지의 PROGRAMS 섹션에서 원하는 프로그램의 신청 버튼을 눌러주세요.',
  '공간 위치를 알려주세요': '메인 페이지의 VISIT 섹션에서 위치와 방문 정보를 확인할 수 있어요.',
};

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: '안녕하세요! BOOKCOVERS입니다. 무엇을 도와드릴까요?' },
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const firstContentSection = document.getElementById('books');
      const hasPassedHero = !firstContentSection || firstContentSection.getBoundingClientRect().top <= window.innerHeight;
      setActionsVisible(hasPassedHero);
      setShowTop(hasPassedHero);
      if (!hasPassedHero) setChatOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatOpen) inputRef.current?.focus();
  }, [chatOpen]);

  const sendMessage = (text) => {
    const value = text.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), from: 'user', text: value },
      {
        id: Date.now() + 1,
        from: 'bot',
        text: QUICK_REPLIES[value] || '문의해 주셔서 감사합니다. 담당자가 확인할 수 있도록 내용을 남겨두었어요.',
      },
    ]);
    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={`floating-actions ${actionsVisible ? 'is-visible' : ''}`}>
      {chatOpen && (
        <section className="chatbot" aria-label="BOOKCOVERS 챗봇">
          <header className="chatbot__header">
            <div>
              <strong>BOOKCOVERS</strong>
              <span><i /> 상담 가능</span>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="챗봇 닫기">×</button>
          </header>

          <div className="chatbot__messages" aria-live="polite">
            {messages.map((message) => (
              <p key={message.id} className={`chatbot__message is-${message.from}`}>{message.text}</p>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="chatbot__quick">
              {Object.keys(QUICK_REPLIES).map((label) => (
                <button type="button" key={label} onClick={() => sendMessage(label)}>{label}</button>
              ))}
            </div>
          )}

          <form className="chatbot__form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="메시지를 입력하세요"
              aria-label="챗봇 메시지"
            />
            <button type="submit" aria-label="메시지 전송">→</button>
          </form>
        </section>
      )}

      <div className="floating-actions__buttons">
        <button
          type="button"
          className={`floating-actions__button is-top ${showTop ? 'is-visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="페이지 맨 위로 이동"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M5 15.5 12 8l7 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className={`floating-actions__button is-chat ${chatOpen ? 'is-active' : ''}`}
          onClick={() => setChatOpen((open) => !open)}
          aria-label={chatOpen ? '챗봇 닫기' : '챗봇 열기'}
          aria-expanded={chatOpen}
        >
          {chatOpen ? '×' : '●●'}
        </button>
      </div>
    </div>
  );
}
