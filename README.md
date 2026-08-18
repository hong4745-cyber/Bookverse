# 📚 BOOKCOVERS

> 취향과 관점을 중심으로 책, 큐레이션, 프로그램, 공간을 연결하는 독립서점 웹사이트

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.17-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)](https://bookverse-app-olive.vercel.app/)

## 프로젝트 소개

BOOKCOVERS는 독립서점의 브랜드 경험을 웹으로 확장한 반응형 웹 프로젝트입니다. 책 표지 마키, 스크롤 기반 아트워크, 3D 인터랙티브 북, 프로그램 신청, 공간 예약, 커뮤니티와 마이페이지를 하나의 서비스 흐름으로 구성했습니다.

### 프로젝트 링크

- 🌐 [운영 사이트](https://bookverse-app-olive.vercel.app/)
- 💻 [GitHub 저장소](https://github.com/hong4745-cyber/Bookverse)

## 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | BOOKCOVERS |
| 프로젝트 유형 | 독립서점 브랜드·서비스 반응형 웹사이트 |
| 담당 역할 | 기획, UI 디자인 구체화, 프론트엔드 개발, Firebase 연동, 배포 |
| 작업 기간 | 2026.07 ~ 2026.08 |
| 기여도 | 개인 프로젝트 100% |
| 배포 환경 | Vercel |

## 주요 기능

- [x] 책 표지와 텍스트가 교차하는 무한 마키
- [x] 화면 단위로 전환되는 가로형 히어로 스크롤
- [x] 4개 아트워크 슬라이드와 즉시 반응하는 인디케이터
- [x] 마우스 움직임에 반응하는 3D 도서 오브젝트
- [x] 추천 도서·북클럽·큐레이션 콘텐츠 제공
- [x] 프로그램 신청 및 입금 상태 안내
- [x] 공간 예약 모달과 예약 데이터 저장
- [x] Firebase 로그인과 사용자별 마이페이지
- [x] 커뮤니티 페이지와 플로팅 액션 UI
- [x] 네이버 지도 기반 서점 위치 안내

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Frontend | React 19, JavaScript, CSS Modules |
| Build | Vite 6 |
| Animation | GSAP, ScrollTrigger, Motion |
| Backend | Firebase Authentication, Cloud Firestore |
| Map | Naver Maps API |
| Quality | Oxlint |
| Deployment | GitHub, Vercel |

## 핵심 구현 내용

### 스크롤 기반 히어로

GSAP Timeline과 ScrollTrigger를 결합해 세 개의 히어로 섹션을 하나의 고정된 화면에서 가로로 전환합니다. 섹션 전환에는 `steps()` 기반 프레임 이동과 스냅을 적용해 중간 위치에서 멈추지 않도록 구성했습니다.

### 무한 마키

동일한 콘텐츠 묶음을 반복 렌더링하고 트랙 너비를 기준으로 이동시켜 끊김 없는 루프를 구현했습니다. 홀수·짝수 행의 방향을 교차시켜 시각적 리듬을 만들었습니다.

### 3D 인터랙티브 북

앞면, 뒷면, 책등, 페이지 면을 분리한 뒤 CSS 3D Transform으로 결합했습니다. 포인터 위치를 회전값으로 변환해 사용자가 책을 직접 돌려보는 듯한 경험을 제공합니다.

### Firebase 데이터 연동

인증 사용자 UID를 신청·예약 데이터와 함께 저장하고, Firestore 보안 규칙에서 본인 데이터만 조회할 수 있도록 제한했습니다.

## Trouble Shooting

| 문제 | 원인 | 해결 |
| --- | --- | --- |
| 아트워크 인디케이터가 한 박자 늦게 반응 | 진행률을 `floor`로 추정해 실제 프레임과 시점 불일치 | 트랙의 실제 `x` 위치를 읽어 현재 인덱스 계산 |
| 인디케이터 클릭 시 페이지가 위로 이동 | 프레임 선택이 문서 스크롤 위치까지 변경 | 문서 스크롤과 내부 아트워크 전환을 분리 |
| 마키가 커서 호버 시 정지 | 공통 hover 규칙에서 애니메이션 중단 | hover 일시정지 규칙 제거 |
| 회전 도형이 중심에서 벗어남 | 위치용 translate와 rotate가 같은 요소에서 충돌 | 위치를 계산값으로 고정하고 중앙 회전만 적용 |
| 배포 파일 용량 증가 | 로컬 영상과 검증용 빌드 폴더 포함 | Vite 복사 필터와 `.vercelignore`로 제외 |

## 성능 최적화

- 움직이는 트랙에 `will-change: transform` 적용
- 이미지와 텍스트 애니메이션을 `transform`과 `opacity` 중심으로 구성
- 반복되는 책 데이터를 재사용해 불필요한 네트워크 요청 방지
- 프로덕션 빌드에서 대용량 로컬 영상 제외
- Vercel 빌드 캐시 활용
- `prefers-reduced-motion` 환경에서 불필요한 애니메이션 제한

## 데이터 구조

```text
programApplications/{applicationId}
├─ userId
├─ programId
├─ programTitle
├─ name
├─ phone
├─ paymentStatus
└─ createdAt

spaceReservations/{reservationId}
├─ userId
├─ name
├─ phone
├─ date
├─ time
├─ people
├─ status
└─ createdAt
```

정적 도서·프로그램·공간·커뮤니티 콘텐츠는 `src/data`에서 화면 컴포넌트와 분리해 관리합니다.

## 프로젝트 구조

```text
bookverse-app/
├─ public/
│  └─ images/             # 도서 표지와 그래픽 에셋
├─ src/
│  ├─ components/         # 공통 UI, 모달, 히어로 컴포넌트
│  │  ├─ deco/            # 장식용 SVG 컴포넌트
│  │  └─ sections/        # 메인 페이지 섹션
│  ├─ data/               # 화면 콘텐츠 데이터
│  ├─ hooks/              # reveal, pattern offset 훅
│  ├─ lib/                # Firebase 초기화
│  ├─ services/           # 신청·예약 데이터 처리
│  ├─ styles/             # 폰트와 디자인 토큰
│  ├─ App.jsx
│  └─ main.jsx
├─ firestore.rules
├─ vercel.json
├─ vite.config.js
└─ package.json
```

## 실행 방법

### 요구 환경

- Node.js 20 이상
- npm

### 설치 및 실행

```bash
git clone https://github.com/hong4745-cyber/Bookverse.git
cd Bookverse
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 환경 변수

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_NAVER_MAP_CLIENT_ID=
```

### 빌드

```bash
npm run build
npm run preview
```

## 주의사항

- Firebase와 네이버 지도 기능을 사용하려면 환경 변수가 필요합니다.
- `.env.local`은 보안상 Git에 포함하지 않습니다.
- 프로그램 신청 및 사용자 활동 조회는 로그인이 필요합니다.
- 외부 API 키에는 허용 도메인과 사용량 제한을 설정해야 합니다.
- 영상 파일은 배포 용량을 줄이기 위해 프로덕션 빌드에서 제외됩니다.

## AI 활용

### 사용한 AI 도구

- OpenAI Codex

### AI 활용 내용

- 컴포넌트 구조와 스크롤 인터랙션 개선안 검토
- 마키·스냅·인디케이터 애니메이션 디버깅
- Firebase 보안 규칙과 신청 데이터 흐름 점검
- 반복적인 CSS 수정, 빌드 검증, Git·Vercel 배포 보조
- README 문서 구조화 및 기술 내용 정리

### 직접 구현한 내용

- 브랜드 콘셉트와 페이지 구성 기획
- 화면별 레이아웃, 타이포그래피, 컬러와 그래픽 방향 결정
- React 컴포넌트와 데이터 구조 설계
- 프로그램 신청, 공간 예약, 로그인, 마이페이지 사용자 흐름 구현
- 실제 콘텐츠·이미지 적용 및 인터랙션 세부 조정

> AI는 구현과 검증을 보조하는 도구로 활용했으며, 최종 기능·디자인 판단과 결과물 검수는 직접 수행했습니다.

## 개선 예정

- [ ] 번들 코드 스플리팅으로 초기 로딩 크기 축소
- [ ] 이미지 WebP·AVIF 변환과 반응형 이미지 적용
- [ ] 관리자용 프로그램·예약 관리 화면 추가
- [ ] 결제·입금 확인 상태 자동화
- [ ] E2E 테스트와 시각 회귀 테스트 도입
- [ ] 모바일 제스처와 접근성 세부 개선

## 프로젝트를 통해 배운 점

- 스크롤 진행률과 실제 화면 상태를 분리하면 인터랙션 동기화 문제가 발생할 수 있음을 배웠습니다.
- 애니메이션은 시각적 효과뿐 아니라 키보드, 터치, 모션 감소 설정까지 함께 고려해야 합니다.
- 인증과 데이터 저장은 UI 구현과 동시에 보안 규칙을 설계해야 안전한 서비스가 됩니다.
- 배포 환경에서는 로컬 개발과 다른 파일 용량, 캐시, 환경 변수 조건을 별도로 검증해야 합니다.

## 프로젝트 회고

BOOKCOVERS를 통해 브랜드 중심의 시각적 웹사이트와 실제 신청·예약 기능을 하나의 React 프로젝트로 연결했습니다. 특히 반복 마키, 고정형 가로 스크롤, 3D 도서처럼 복합적인 애니메이션을 구현하면서 화면에 보이는 프레임과 상태 관리의 동기화가 사용자 경험에 직접 영향을 준다는 점을 확인했습니다. 앞으로는 현재의 시각적 완성도를 유지하면서 번들 최적화, 자동화 테스트, 관리자 기능을 보강할 계획입니다.

## License

이 프로젝트는 포트폴리오 목적으로 제작되었습니다. 프로젝트에 포함된 도서 이미지, 폰트, 브랜드 에셋의 저작권은 각 원저작자에게 있으며, 별도의 허가 없이 상업적으로 사용할 수 없습니다.

코드 사용 범위는 저장소의 라이선스 정책을 따릅니다.
