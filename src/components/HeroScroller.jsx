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
const P12 = 60;   // pan H1 → H2
const H2  = 150;  // H2 content
const P23 = 60;   // pan H2 → H3
const H3  = 200;  // H3 content

const T1 = H1;           //  30
const T2 = T1 + P12;     //  90  H2 content starts
const T3 = T2 + H2;      // 240  pan H2→H3 starts
const T4 = T3 + P23;     // 300  H3 content starts
const T5 = T4 + H3;      // 500  end

export default function HeroScroller() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const vw    = window.innerWidth;
    const sec2  = document.getElementById('hero2');
    const sec3  = document.getElementById('hero3');

    // ── H2 element queries ─────────────────────────
    const s2M  = sec2.querySelector('.s2-marquee-layer');
    const s2I  = sec2.querySelector('.s2-bg-img');
    const s2C  = sec2.querySelector('.s2-bg-color');
    const s2T  = sec2.querySelector('.s2-small-title');
    const s2L1 = sec2.querySelector('.s2-line-1');
    const s2L2 = sec2.querySelector('.s2-line-2');
    const s2L3 = sec2.querySelector('.s2-line-3');
    const s2L4 = sec2.querySelector('.s2-line-4');
    const s2D  = sec2.querySelector('.s2-desc');
    const s2Fl = sec2.querySelector('.s2-flower');
    const s2Bu = sec2.querySelector('.s2-butterfly');

    // ── H3 element queries ─────────────────────────
    const s3St = sec3.querySelector('.s3-step2-text');
    const s3M  = sec3.querySelector('.s3-marquee-layer');
    const s3I  = sec3.querySelector('.s3-bg-img');
    const s3C  = sec3.querySelector('.s3-bg-color');
    const s3Cs = sec3.querySelector('.s3-center-stage');
    const s3C1 = sec3.querySelector('.s3-curation-line-1');
    const s3C2 = sec3.querySelector('.s3-curation-line-2');
    const s3De = sec3.querySelectorAll('.s3-deco');

    const masterTl = gsap.timeline({ paused: true });

    // ── Pan H1 → H2 (ease:none = constant speed with scrub smoothing) ──
    masterTl.fromTo(track, { x: 0 }, { x: -vw, ease: 'none', duration: P12 }, T1);

    // ── H2 content (T2=90 … T3=240, budget 150) ──
    masterTl.to([s2M, s2I, s2C],
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
    masterTl.fromTo(s2Fl,
      { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ease: 'none', duration: 18 }, T2 + 120);
    masterTl.fromTo(s2Bu,
      { opacity: 0, scale: 0.5, rotation: -30 },
      { opacity: 1, scale: 1, rotation: 0, ease: 'none', duration: 18 }, T2 + 128);

    // ── Pan H2 → H3 ──────────────────────────────
    masterTl.fromTo(track, { x: -vw }, { x: -2 * vw, ease: 'none', duration: P23 }, T3);

    // ── H3 content (T4=300 … T5=500, budget 200) ──
    masterTl.to(s3St,
      { y: -80, opacity: 0, ease: 'none', duration: 25 }, T4);
    masterTl.to([s3M, s3I, s3C],
      { opacity: 0, ease: 'none', duration: 40 }, T4 + 5);
    masterTl.to([s3I, s3C],
      { opacity: 1, ease: 'none', duration: 25 }, T4 + 90);
    masterTl.to(s3Cs,
      { opacity: 1, ease: 'none', duration: 30 }, T4 + 100);
    masterTl.fromTo(s3C1,
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none', duration: 22 }, T4 + 130);
    masterTl.fromTo(s3C2,
      { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none', duration: 22 }, T4 + 150);
    masterTl.fromTo(s3De,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, ease: 'none', duration: 15, stagger: 10 }, T4 + 168);

    // ── ScrollTrigger ─────────────────────────────
    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      animation: masterTl,
      start: 'top top',
      end: `+=${T5}vh`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    });

    return () => { st.kill(); masterTl.kill(); };
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
