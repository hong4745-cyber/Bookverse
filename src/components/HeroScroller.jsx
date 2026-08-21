import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection1 from './HeroSection1';
import HeroSection2 from './HeroSection2';
import HeroSection3 from './HeroSection3';
import './HeroScroller.css';

gsap.registerPlugin(ScrollTrigger);

const H1 = 30;
const P12 = 100;
const H2 = 200;
const P23 = 100;
const H3 = 290;
const T1 = H1;
const T2 = T1 + P12;
const T3 = T2 + H2;
const T4 = T3 + P23;
const T5 = T4 + H3;

export default function HeroScroller() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);

  const scrollToNextHero = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    const vw = window.innerWidth;
    const sec2 = document.getElementById('hero2');

    const s2M = sec2.querySelector('.s2-marquee-layer');
    const s2I = sec2.querySelector('.s2-bg-img');
    const s2T = sec2.querySelector('.s2-small-title');
    const s2L1 = sec2.querySelector('.s2-line-1');
    const s2L2 = sec2.querySelector('.s2-line-2');
    const s2L3 = sec2.querySelector('.s2-line-3');
    const s2L4 = sec2.querySelector('.s2-line-4');
    const s2D = sec2.querySelector('.s2-desc');
    const s2Flower = sec2.querySelector('.s2-motif-flower');
    const s2Bow = sec2.querySelector('.s2-motif-bow');
    const s3Track = document.querySelector('#hero3 .s3-horizontal-track');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const masterTl = gsap.timeline({ paused: true });

    masterTl.fromTo(track, { x: 0 }, { x: -vw, ease: 'steps(1)', duration: P12 }, T1);
    masterTl.to([s2M, s2I], { opacity: 0.15, ease: 'none', duration: 80 }, T2);
    masterTl.fromTo(s2T, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none', duration: 20 }, T2 + 60);
    masterTl.set(s2Flower, { opacity: 1 }, T2 + 55);
    masterTl.fromTo(s2Bow, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 10 }, T2 + 55);
    masterTl.fromTo(s2L1, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 65);
    masterTl.fromTo(s2L2, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 78);
    masterTl.fromTo(s2L3, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 90);
    masterTl.fromTo(s2L4, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 102);
    masterTl.fromTo(s2D, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 112);
    masterTl.fromTo(track, { x: -vw }, { x: -2 * vw, ease: 'steps(1)', duration: P23 }, T3);
    masterTl.fromTo(s3Track, { x: 0 }, { x: () => -3 * window.innerWidth, ease: 'steps(3)', duration: H3 }, T4);

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      animation: masterTl,
      start: 'top top',
      end: () => `+=${T5 * window.innerHeight / 100}`,
      pin: true,
      scrub: true,
      snap: reduceMotion ? false : {
        snapTo(progress) {
          const timelineTime = progress * T5;
          if (timelineTime < T2) {
            return timelineTime < T2 / 2 ? 0 : T2 / T5;
          }
          if (timelineTime < T4) return progress;
          const slideIndex = Math.round(((timelineTime - T4) / H3) * 3);
          return (T4 + (Math.max(0, Math.min(3, slideIndex)) / 3) * H3) / T5;
        },
        duration: { min: 0.18, max: 0.55 },
        delay: 0.08,
        ease: 'power1.inOut',
      },
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
    stRef.current = st;

    let lastSlide = -1;
    const announceSlide = () => {
      const trackX = Number(gsap.getProperty(s3Track, 'x')) || 0;
      const index = Math.max(0, Math.min(3, Math.round(Math.abs(trackX) / window.innerWidth)));
      if (index === lastSlide) return;
      lastSlide = index;
      window.dispatchEvent(new CustomEvent('hero3:change', { detail: { index } }));
    };
    masterTl.eventCallback('onUpdate', announceSlide);

    const goToSlide = (event) => {
      const index = Math.max(0, Math.min(3, event.detail?.index ?? 0));
      const timelineTime = T4 + (index / 3) * H3;
      masterTl.time(timelineTime, false);
      announceSlide();
    };
    window.addEventListener('hero3:goto', goToSlide);

    return () => {
      window.removeEventListener('hero3:goto', goToSlide);
      st.kill();
      masterTl.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <div className="hero-scroll-outer" ref={outerRef}>
      <div className="heroes-track" ref={trackRef}>
        <HeroSection1 />
        <HeroSection2 />
        <HeroSection3 />
      </div>
      <button
        className="hero-scroll-down"
        type="button"
        aria-label="다음 히어로 화면으로 스크롤"
        onClick={scrollToNextHero}
      >
        <img className="hero-scroll-icon-default" src="/images/down-arrow_9240877.svg?v=2" alt="" aria-hidden="true" />
      </button>
    </div>
  );
}
