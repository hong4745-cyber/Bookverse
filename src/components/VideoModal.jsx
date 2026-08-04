import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import CircularText from './CircularText';
import './VideoModal.css';

// ── WebGL shaders ──────────────────────────────────────────────────────────────
const VS = `
  attribute vec2 a_pos;
  attribute vec2 a_uv;
  varying vec2 v_uv;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
    v_uv = a_uv;
  }
`;

const FS = `
  precision mediump float;
  uniform sampler2D u_video;
  uniform vec3  u_keyColor;
  uniform float u_threshold;
  uniform float u_smoothness;
  varying vec2 v_uv;

  void main() {
    vec4 c = texture2D(u_video, v_uv);
    float dist = distance(c.rgb, u_keyColor);
    float alpha = smoothstep(
      u_threshold - u_smoothness,
      u_threshold + u_smoothness,
      dist
    );
    vec3 col = c.rgb;
    float edge = 1.0 - alpha;
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(luma), edge * 0.5);
    col = clamp(col, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

function buildGL(canvas, keyColor) {
  const gl =
    canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true }) ||
    canvas.getContext('experimental-webgl', { premultipliedAlpha: false, alpha: true });
  if (!gl) return null;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  0, 0,
     1, -1,  1, 0,
    -1,  1,  0, 1,
     1,  1,  1, 1,
  ]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'a_pos');
  const aUv  = gl.getAttribLocation(prog, 'a_uv');
  gl.enableVertexAttribArray(aPos);
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(aUv,  2, gl.FLOAT, false, 16, 8);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  // 유니폼 위치 저장 → 나중에 동적으로 업데이트 가능
  const uKeyColor  = gl.getUniformLocation(prog, 'u_keyColor');
  const uThreshold = gl.getUniformLocation(prog, 'u_threshold');
  const uSmooth    = gl.getUniformLocation(prog, 'u_smoothness');

  const [kr, kg, kb] = keyColor || [0.20, 0.38, 0.35]; // 기본: 틸 추정값

  gl.uniform1i(gl.getUniformLocation(prog, 'u_video'), 0);
  gl.uniform3f(uKeyColor,  kr, kg, kb);
  gl.uniform1f(uThreshold, 0.22);              // 과도 제거 줄이기
  gl.uniform1f(uSmooth,    0.08);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  return { gl, tex, uKeyColor, uThreshold, uSmooth };
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function VideoModal({ book, onClose }) {
  const canvasRef  = useRef(null);
  const videoRef   = useRef(null);
  const rafRef     = useRef(null);
  const glCtxRef   = useRef(null); // GL 컨텍스트 + 유니폼 위치 저장

  const [ended,    setEnded]    = useState(false);
  const [closing,  setClosing]  = useState(false);
  const [sampling, setSampling] = useState(false); // 배경색 샘플링 모드

  // 스크롤 잠금 + ScrollTrigger 비활성화
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('videomodal:open'));
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('videomodal:close'));
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // WebGL 초기화 + 렌더 루프 (크로마키 사용하는 책만)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});

    const canvas = canvasRef.current;
    if (!canvas) return; // 크로마키 미적용: 원본 영상 그대로 재생

    let raf;

    const startGL = () => {
      canvas.width  = video.videoWidth  || 1920;
      canvas.height = video.videoHeight || 1080;

      const ctx = buildGL(canvas, book.keyColor);
      if (!ctx) return;
      glCtxRef.current = ctx;

      const { gl, tex } = ctx;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const tick = () => {
        if (video.readyState >= 2) {
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        raf = requestAnimationFrame(tick);
        rafRef.current = raf;
      };
      raf = requestAnimationFrame(tick);
      rafRef.current = raf;
    };

    if (video.readyState >= 1) startGL();
    else video.addEventListener('loadedmetadata', startGL, { once: true });

    return () => cancelAnimationFrame(raf);
  }, []);

  // 캔버스 클릭 → 해당 픽셀 색상을 키 컬러로 설정
  const handleCanvasSample = useCallback((e) => {
    if (!sampling) return;
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video || !glCtxRef.current) return;

    // 2D 캔버스로 비디오 현재 프레임 드로우 → 픽셀 샘플링
    const tmp = document.createElement('canvas');
    tmp.width  = video.videoWidth;
    tmp.height = video.videoHeight;
    const ctx2d = tmp.getContext('2d');
    ctx2d.drawImage(video, 0, 0);

    const rect   = canvas.getBoundingClientRect();
    const scaleX = video.videoWidth  / rect.width;
    const scaleY = video.videoHeight / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top)  * scaleY);

    const px = ctx2d.getImageData(x, y, 1, 1).data;
    const r  = px[0] / 255;
    const g  = px[1] / 255;
    const b  = px[2] / 255;

    const { gl, uKeyColor } = glCtxRef.current;
    gl.uniform3f(uKeyColor, r, g, b);

    setSampling(false);
  }, [sampling]);

  const handleClose = useCallback(() => {
    setClosing(true);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
    setTimeout(onClose, 340);
  }, [onClose]);

  const handleReplay = () => {
    const v = videoRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    setEnded(false);
  };

  const useChroma = book.chromaKey !== false;

  const modal = (
    <div className={`vm-overlay${closing ? ' vm-closing' : ''}`} style={{ '--pattern-color': '#00C0E8' }}>
      <div className="vm-bg" />
      <div className="vm-color-tint" />

      <video
        ref={videoRef}
        src={book.video}
        className={useChroma ? 'vm-video-src' : 'vm-video-fill'}
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
      />

      {useChroma && (
        <div className="vm-canvas-wrap">
          <canvas
            ref={canvasRef}
            className={`vm-canvas${sampling ? ' vm-sampling' : ''}`}
            onClick={handleCanvasSample}
          />
        </div>
      )}

      {/* 배경색 샘플링 버튼 */}
      {useChroma && (
        <button
          className={`vm-sample-btn${sampling ? ' active' : ''}`}
          onClick={() => setSampling(s => !s)}
          title="클릭 후 영상의 배경 부분을 클릭하세요"
        >
          {sampling ? '배경을 클릭하세요 ✕' : '배경색 선택'}
        </button>
      )}

      <button className="vm-close" onClick={handleClose} aria-label="닫기">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="2" y1="2" x2="18" y2="18" />
          <line x1="18" y1="2" x2="2" y2="18" />
        </svg>
      </button>

      {ended && (
        <div className="vm-end-controls">
          <div className="vm-replay-circle">
            <CircularText
              text="REPLAY*REPLAY*"
              onHover="speedUp"
              spinDuration={16}
              className="vm-replay-circular-text"
            />
            <button className="vm-replay-center" onClick={handleReplay} aria-label="다시 보기">
              REPLAY
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(modal, document.body);
}
