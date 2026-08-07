import { useEffect, useRef, useState } from 'react';
import styles from './SubwayMap.module.css';

const NAVER_MAP_SCRIPT_ID = 'naver-map-sdk';
const BOOKCOVERS_POSITION = { lat: 37.5765, lng: 126.9854 };

function loadNaverMap(clientId) {
  if (window.naver?.maps) return Promise.resolve(window.naver.maps);

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(NAVER_MAP_SCRIPT_ID);
    const handleLoad = () => resolve(window.naver.maps);
    const handleError = () => reject(new Error('naver-map-load-failed'));

    if (existingScript) {
      existingScript.addEventListener('load', handleLoad, { once: true });
      existingScript.addEventListener('error', handleError, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = NAVER_MAP_SCRIPT_ID;
    script.async = true;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}`;
    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });
    document.head.appendChild(script);
  });
}

export default function SubwayMap() {
  const mapElement = useRef(null);
  const [error, setError] = useState('');
  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    let disposed = false;

    if (!clientId) {
      setError('네이버 지도 Client ID가 설정되지 않았습니다.');
      return undefined;
    }

    loadNaverMap(clientId)
      .then((maps) => {
        if (disposed || !mapElement.current) return;
        const position = new maps.LatLng(BOOKCOVERS_POSITION.lat, BOOKCOVERS_POSITION.lng);
        const map = new maps.Map(mapElement.current, {
          center: position,
          zoom: 16,
          zoomControl: true,
          zoomControlOptions: { position: maps.Position.TOP_RIGHT },
          mapTypeControl: false,
          scaleControl: true,
        });

        const marker = new maps.Marker({
          position,
          map,
          title: 'BOOKCOVERS',
          icon: {
            content: `
              <div class="bookcovers-map-marker" aria-label="BOOKCOVERS 위치">
                <strong>BOOKCOVERS</strong>
                <small>YOU ARE WELCOME</small>
              </div>
            `,
            anchor: new maps.Point(40, 40),
          },
        });
        const infoWindow = new maps.InfoWindow({
          content: `
            <article class="bookcovers-map-info">
              <span class="bookcovers-map-info__eyebrow">INDEPENDENT BOOKSTORE</span>
              <strong>BOOKCOVERS</strong>
              <p>안국역 1번 출구에서 도보 5분</p>
              <a href="https://map.naver.com/" target="_blank" rel="noreferrer">NAVER MAP ↗</a>
            </article>
          `,
          borderWidth: 0,
          backgroundColor: 'transparent',
          anchorColor: 'transparent',
          disableAnchor: true,
          pixelOffset: new maps.Point(0, -14),
        });
        maps.Event.addListener(marker, 'click', () => infoWindow.open(map, marker));
      })
      .catch(() => {
        if (!disposed) setError('지도를 불러오지 못했습니다. 등록된 웹 서비스 URL을 확인해 주세요.');
      });

    return () => {
      disposed = true;
    };
  }, [clientId]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapElement} className={styles.map} aria-label="안국역 인근 BOOKCOVERS 위치 지도" />
      <div className={styles.tint} aria-hidden="true" />
      <span className={styles.mapLabel}>BOOKCOVERS · ANGUK</span>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}
