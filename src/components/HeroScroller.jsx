import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection1 from './HeroSection1';
import HeroSection2 from './HeroSection2';
import HeroSection3 from './HeroSection3';
import './HeroScroller.css';

gsap.registerPlugin(ScrollTrigger);

// All durations in masterTl units (1 unit = 1 vh of scroll)
const H1  = 30;   // H1 dwell
const P12 = 100;  // pan H1 → H2
const H2  = 200;  // H2 content
const P23 = 100;  // pan H2 → H3
const H3  = 200;  // H3 content

const T1 = H1;           //  30
const T2 = T1 + P12;     //  90  H2 content starts
const T3 = T2 + H2;      // 240  pan H2→H3 starts
const T4 = T3 + P23;     // 300  H3 content starts
const T5 = T4 + H3;      // 500  end

export default function HeroScroller() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const stRef    = useRef(null);
  const modalScrollRef = useRef(0);

  // 영상 모달 열릴 때 ScrollTrigger 일시 정지 / 닫힐 때 복원
  useEffect(() => {
    const pause = () => {
      modalScrollRef.current = window.scrollY;
      // pin과 타임라인 진행 상태를 되돌리지 않고 입력만 일시 정지
      stRef.current?.disable(false, true);
    };
    const restore = () => {
      const trigger = stRef.current;
      if (!trigger) return;
      trigger.enable(false, false);
      window.scrollTo(0, modalScrollRef.current);
      ScrollTrigger.update();
    };
    window.addEventListener('videomodal:open',  pause);
    window.addEventListener('videomodal:close', restore);
    return () => {
      window.removeEventListener('videomodal:open',  pause);
      window.removeEventListener('videomodal:close', restore);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const vw    = window.innerWidth;
    const sec2  = document.getElementById('hero2');
    const sec3  = document.getElementById('hero3');

    // ── H2 element queries ─────────────────────────
    const s2M  = sec2.querySelector('.s2-marquee-layer');
    const s2I  = sec2.querySelector('.s2-bg-img');
    const s2T  = sec2.querySelector('.s2-small-title');
    const s2L1 = sec2.querySelector('.s2-line-1');
    const s2L2 = sec2.querySelector('.s2-line-2');
    const s2L3 = sec2.querySelector('.s2-line-3');
    const s2L4 = sec2.querySelector('.s2-line-4');
    const s2D  = sec2.querySelector('.s2-desc');

    // ── H3 element queries ─────────────────────────
    const s3CT = sec3.querySelector('.s3-curtain-top');
    const s3CB = sec3.querySelector('.s3-curtain-bottom');
    const s3I  = sec3.querySelector('.s3-bg-img');
    const s3Cs = sec3.querySelector('.s3-center-stage');
    const s3C1 = sec3.querySelector('.s3-curation-line-1');
    const s3C2 = sec3.querySelector('.s3-curation-line-2');

    const masterTl = gsap.timeline({ paused: true });

    // ── Pan H1 → H2 (ease:none = constant speed with scrub smoothing) ──
    masterTl.fromTo(track, { x: 0 }, { x: -vw, ease: 'none', duration: P12 }, T1);

    // ── H2 content (T2=90 … T3=240, budget 150) ──
    masterTl.to([s2M, s2I],
      { opacity: 0.15, ease: 'none', duration: 80 }, T2);
    masterTl.fromTo(s2T,
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none', duration: 20 }, T2 + 60);
    masterTl.fromTo(s2L1,
      { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 65);
    masterTl.fromTo(s2L2,
      { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 78);
    masterTl.fromTo(s2L3,
      { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 90);
    masterTl.fromTo(s2L4,
      { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 102);
    masterTl.fromTo(s2D,
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none', duration: 18 }, T2 + 112);
    // ── Pan H2 → H3 ──────────────────────────────
    masterTl.fromTo(track, { x: -vw }, { x: -2 * vw, ease: 'none', duration: P23 }, T3);

    // ── H3 content (T4=300 … T5=500, budget 200) ──
    // 커튼 오픈: 위는 위로, 아래는 아래로 슬라이드
    masterTl.to(s3CT, { yPercent: -100, ease: 'none', duration: 50 }, T4);
    masterTl.to(s3CB, { yPercent:  100, ease: 'none', duration: 50 }, T4);
    masterTl.to(s3I, { opacity: 0, ease: 'none', duration: 50 }, T4);

    // 커튼이 열린 후 큐레이션 스테이지 등장
    masterTl.to(s3Cs,
      { opacity: 1, ease: 'none', duration: 30 }, T4 + 60);
    masterTl.fromTo(s3C1,
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none', duration: 22 }, T4 + 60);
    masterTl.fromTo(s3C2,
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none', duration: 22 }, T4 + 60);
    // ── ScrollTrigger ─────────────────────────────
    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      animation: masterTl,
      start: 'top top',
      // ScrollTrigger's "+=" relative offsets only understand px/%, not vh —
      // convert T5 (in vh units) to px ourselves or the pin releases almost instantly.
      end: () => `+=${T5 * window.innerHeight / 100}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
    stRef.current = st;

    return () => { st.kill(); masterTl.kill(); stRef.current = null; };
  }, []);

  return (
    <div className="hero-scroll-outer" ref={outerRef}>
      <div className="heroes-track" ref={trackRef}>
        <HeroSection1 />
        <HeroSection2 />
        <HeroSection3 />
      </div>
    </div>
  );
}
