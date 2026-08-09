import { useRef } from 'react';

export default function InteractiveBook({ front, back, spine, title }) {
  const bookRef = useRef(null);

  const handlePointerMove = (event) => {
    const book = bookRef.current;
    if (!book) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    book.style.setProperty('--book-rotate-y', `${x * 300}deg`);
    book.style.setProperty('--book-rotate-x', `${y * -16}deg`);
    book.style.setProperty('--book-shift-x', `${x * 14}px`);
    book.style.setProperty('--book-shift-y', `${y * 10}px`);
  };

  const resetBook = () => {
    const book = bookRef.current;
    if (!book) return;
    book.style.setProperty('--book-rotate-y', '22deg');
    book.style.setProperty('--book-rotate-x', '2deg');
    book.style.setProperty('--book-shift-x', '0px');
    book.style.setProperty('--book-shift-y', '0px');
  };

  return (
    <span
      className="s3-interactive-book-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetBook}
    >
      <span className="s3-interactive-book" ref={bookRef}>
        <span className="s3-book-face s3-book-front"><img src={front} alt={title} /></span>
        <span className="s3-book-face s3-book-back"><img src={back} alt="" /></span>
        <span className="s3-book-face s3-book-spine"><img src={spine} alt="" /></span>
        <span className="s3-book-pages s3-book-page-edge" aria-hidden="true" />
        <span className="s3-book-pages s3-book-page-top" aria-hidden="true" />
        <span className="s3-book-pages s3-book-page-bottom" aria-hidden="true" />
      </span>
    </span>
  );
}
