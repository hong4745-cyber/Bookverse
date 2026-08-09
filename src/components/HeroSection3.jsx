import { useEffect, useRef, useState } from 'react';
import InteractiveBook from './InteractiveBook';
import './HeroSection3.css';

const BOOKS = [
  { front: '/images/book_1_front.jpg.jpg', back: '/images/book_1_back.jpg.jpg', spine: '/images/book_1_spine.jp.jpg', title: '윗집 부부' },
  { front: '/images/book_2_spine.jpg.jpg', back: '/images/book_2_back.jpg.jpg', spine: '/images/book_2_front.jpg.jpg', title: '빵 중 사육 준수 사항' },
  { front: '/images/book_3_back.jpg.jpg', back: '/images/book_3_spine.jpg.jpg', spine: '/images/book_3_front.jpg.jpg', title: '물고기는 존재하지 않는다' },
  { front: '/images/book_4_back.jpg.jpg', back: '/images/book_4_spine.jpg.jpg', spine: '/images/book_4_front.jpg.jpg', title: '소크라테스 익스프레스' },
];

const SLIDES = [
  { theme: 'neighbor', label: '낯선 이웃이 서로의 계단이 되어가는 이야기', words: [['낯선','w1'],['이웃이','w2'],['서로의','w3'],['계단이','w4'],['되어가는','w5'],['이야기','w6']], art: [['03','건물','a1'],['04','계절 꽃','a2'],['02','젊은 부부','a3'],['01','할아버지','a4'],['18_1','할머니','a5']] },
  { theme: 'bread', label: '달콤한 기호가 끔찍한 욕망으로 부화하기 시작했다', words: [['달콤한','w1'],['기호가','w2'],['끔찍한 욕망으로','w3'],['부화하기','w4'],['시작했다','w5']], art: [['08','딸기 온실','a1'],['05','채소 상자를 든 남자','a2'],['07','빵 사육 선반','a3'],['09','애벌레 포장지','a4'],['06','애벌레','a5']] },
  { theme: 'fish', label: '무너진 질서 끝에서 비로소 발견한 삶의 가능성', words: [['무너진 질서','w1'],['끝에서','w2'],['비로소','w3'],['발견한','w4'],['삶의','w5'],['가능성','w6']], art: [['11_1','무너진 표본장','a1'],['12_1','이어진 물고기','a2'],['13_1','생명의 물고기','a3'],['10_1','물고기를 든 학자','a4']] },
  { theme: 'philosophy', label: '길을 잃은 순간 철학 여행 열차가 도착했다', words: [['길을','w1'],['잃은 순간','w2'],['철학여행','w3'],['열차가','w4'],['도착했다','w5']], art: [['15_1','사색하는 사람','a1'],['16_1','소크라테스 조각상','a2'],['14_1','철학 여행 열차','a3'],['17_1','열차 안 철학자들','a4']] },
];

export default function HeroSection3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleChange = (event) => setActiveIndex(event.detail.index);
    window.addEventListener('hero3:change', handleChange);
    return () => window.removeEventListener('hero3:change', handleChange);
  }, []);

  const goTo = (index) => window.dispatchEvent(new CustomEvent('hero3:goto', { detail: { index } }));
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(Math.max(0, activeIndex - 1)); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(Math.min(SLIDES.length - 1, activeIndex + 1)); }
  };
  const handleTouchStart = (event) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    goTo(distance > 0 ? Math.max(0, activeIndex - 1) : Math.min(SLIDES.length - 1, activeIndex + 1));
  };

  return (
    <section className="hero-section-3" id="hero3" role="region" aria-roledescription="carousel" aria-label="BOOKCOVERS 추천 도서"
      tabIndex="0" onKeyDown={handleKeyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="s3-horizontal-track">
        {SLIDES.map((slide, index) => (
          <article className={`s3-feature-slide s3-slide-${slide.theme}`} role="group" aria-roledescription="slide"
            aria-label={`${index + 1} / ${SLIDES.length}: ${slide.label}`} aria-hidden={index !== activeIndex} key={slide.theme}>
            <div className="s3-pattern" aria-hidden="true" />
            <div className="s3-copy" aria-hidden="true">
              {slide.words.map(([word, className]) => <span className={`s3-word ${className}`} key={word}>{word}</span>)}
            </div>
            <div className="s3-artwork" aria-hidden="true">
              {slide.art.map(([file, alt, className]) => <img className={`s3-art ${className}`} src={`/images/hero_book_${file}.png`} alt={alt} draggable="false" key={file} />)}
            </div>
            <InteractiveBook {...BOOKS[index]} />
          </article>
        ))}
      </div>
      <div className="s3-indicators" aria-label="슬라이드 선택">
        {SLIDES.map((slide, index) => <button className={`s3-indicator${index === activeIndex ? ' is-active' : ''}`} type="button"
          onClick={() => goTo(index)} aria-label={`${index + 1}번 슬라이드로 이동`} aria-current={index === activeIndex ? 'true' : undefined} key={slide.theme} />)}
      </div>
      <p className="sr-only" aria-live="polite">{`${activeIndex + 1} / ${SLIDES.length}: ${SLIDES[activeIndex].label}`}</p>
    </section>
  );
}
