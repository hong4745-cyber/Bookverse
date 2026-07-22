import './BookCover.css';

export default function BookCover({ book, style, className = '' }) {
  return (
    <div className={`book-cover ${className}`} style={style}>
      <img
        src={book.src}
        alt=""
        draggable="false"
        loading="lazy"
      />
    </div>
  );
}
