import { useEffect, useRef, useState } from 'react';

// 섹션의 문서 기준 절대 Y좌표를 구해 배경 패턴의 mask-position으로 쓸 수 있게 반환.
// 같은 패턴 이미지를 여러 섹션에서 나눠 쓸 때, 각 섹션이 자기 박스 기준 (0,0)부터
// 다시 시작하는 대신 문서 전체를 기준으로 이어진 것처럼 보이게 하기 위함.
export default function usePatternOffset() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      setOffset(top);
    };
    measure();
    window.addEventListener('resize', measure);
    // 웹폰트가 늦게 로드되면 텍스트 리플로우로 섹션 위치가 밀리므로 재측정
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return [ref, offset];
}
