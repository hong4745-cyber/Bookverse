# 🎧 Bowers & Wilkins All-in-One Renewal

> 프리미엄 오디오 브랜드 Bowers & Wilkins를 모티브로 제작한 React 기반 커머스 페이지 리뉴얼 프로젝트

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication%20%7C%20Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)](https://onepage-khaki.vercel.app/)

<p align="center">
  <!-- 권장 이미지: 1600 × 900px / docs/images/main-preview.png -->
  <img src="./docs/images/main-preview.png" width="90%" alt="Bowers & Wilkins 메인 페이지 미리보기" />
</p>
<p align="center"><sub>Desktop Main Preview</sub></p>

> 🖼️ 위 이미지가 표시되지 않는 경우 `docs/images/main-preview.png` 경로에 대표 이미지를 추가하세요.

## 프로젝트 소개

기존 브랜드 사이트의 고급스러운 디자인 감성을 유지하면서, 단순한 UI 구현을 넘어 실제 쇼핑몰의 구매 흐름을 경험할 수 있도록 리뉴얼한 프로젝트입니다.

상품 탐색부터 장바구니, 결제, 주문 완료까지 하나의 서비스 흐름으로 구성했습니다. React 기반 SPA, Firebase 인증 및 게시판, Polar.sh 결제 연동, Three.js 인터랙션을 적용해 실제 커머스 서비스와 유사한 구조를 구현했습니다.

### 프로젝트 링크

- 🌐 [Live Demo](https://onepage-khaki.vercel.app/)
- 💻 [GitHub Repository](https://github.com/hong4745-cyber/onepage)
- 📄 [Project Documentation](https://github.com/user-attachments/files/29692864/Bowers_Wilkins_Project.pdf)

## 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | Bowers & Wilkins All-in-One Renewal |
| 프로젝트 유형 | 프리미엄 오디오 브랜드 커머스 페이지 리뉴얼 |
| 개발 기간 | 2026.07 (3일) |
| 개발 인원 | 1인 프로젝트 |
| 담당 역할 | 기획, UI/UX 디자인, 프론트엔드 개발 |
| 기여도 | 100% |

## 프로젝트 목표

- 프리미엄 브랜드 감성을 반영한 UI/UX 구현
- 상품 탐색부터 주문 완료까지 이어지는 커머스 흐름 구현
- React 컴포넌트 중심의 확장 가능한 구조 설계
- Context API를 활용한 전역 상태 관리
- Firebase 기반 사용자 인증 및 데이터 관리
- 실제 결제 시스템 연동 경험
- 반응형 레이아웃과 사용자 중심 인터랙션 구현

## 주요 기능

- [x] React Router 기반 SPA 및 동적 라우팅
- [x] 상품 카테고리·BEST·NEW·SALE 필터와 정렬
- [x] 실시간 상품 검색 오버레이
- [x] 장바구니 및 위시리스트 상태 유지
- [x] Polar.sh 결제 및 주문 완료 흐름
- [x] Firebase 이메일·Google 로그인
- [x] Firestore 기반 게시판 CRUD
- [x] 다크모드 및 라이트모드
- [x] Three.js 3D 배경과 GSAP·Motion 인터랙션
- [x] 반응형 플로팅 퀵 내비게이션

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Design | Figma |
| Frontend | React 19, JavaScript, HTML5, CSS3 |
| Build | Vite 8 |
| Routing | React Router DOM |
| State | Context API, Local Storage |
| Backend | Firebase Authentication, Cloud Firestore |
| Payment | Polar.sh API |
| Animation | GSAP, Motion, Three.js |
| UI Library | Font Awesome, React Icons |
| Deployment | GitHub, Vercel |

## 화면 및 기능

### 1. Hero Visual

<p align="center">
  <!-- 권장 이미지: docs/images/hero.png -->
  <img src="./docs/images/hero.png" width="80%" alt="Hero Visual" />
</p>

- 브랜드 아이덴티티와 대표 제품을 강조하는 랜딩 화면
- GSAP 진입 애니메이션과 Three.js 3D 배경 적용
- CTA를 통한 상품 페이지 이동
- 화면 크기에 대응하는 반응형 레이아웃

### 2. 상품 목록 및 상세

<p align="center">
  <!-- 권장 이미지: docs/images/product-list.png, docs/images/product-detail.png -->
  <img src="./docs/images/product-list.png" width="48%" alt="상품 목록" />
  <img src="./docs/images/product-detail.png" width="48%" alt="상품 상세" />
</p>

- 카테고리, BEST, NEW, SALE 필터와 가격 정렬
- URL에 필터 상태를 반영해 공유 후에도 동일한 화면 유지
- Dynamic Route를 활용한 상세 페이지 자동 매핑
- 색상 옵션, 재고, 할인 가격, 리뷰 및 평점 제공

### 3. Search Overlay

<p align="center">
  <!-- 권장 이미지: docs/images/search-overlay.png -->
  <img src="./docs/images/search-overlay.png" width="80%" alt="상품 검색 오버레이" />
</p>

- Search Context 기반 전역 검색 상태 관리
- 상품명과 카테고리를 대상으로 실시간 필터링
- 현재 페이지를 벗어나지 않고 검색 결과 확인
- 결과 선택 시 해당 상품 상세 페이지로 이동

### 4. 장바구니 및 위시리스트

<p align="center">
  <!-- 권장 이미지: docs/images/cart.png, docs/images/wishlist.png -->
  <img src="./docs/images/cart.png" width="48%" alt="장바구니" />
  <img src="./docs/images/wishlist.png" width="48%" alt="위시리스트" />
</p>

- Context API로 장바구니와 위시리스트 상태 관리
- 상품 수량 변경, 삭제, 총 결제 금액 자동 계산
- Local Storage 연동으로 새로고침 이후에도 데이터 유지

### 5. Checkout 및 Polar.sh 결제

<p align="center">
  <!-- 권장 이미지: docs/images/checkout.png, payment.png, order-complete.png -->
  <img src="./docs/images/checkout.png" width="31%" alt="Checkout" />
  <img src="./docs/images/payment.png" width="31%" alt="Polar.sh 결제" />
  <img src="./docs/images/order-complete.png" width="31%" alt="주문 완료" />
</p>

- 장바구니 상품과 총액을 Checkout 페이지에 자동 반영
- 서버를 통한 Polar.sh 결제 요청
- 결제 완료 후 주문 완료 페이지로 이동
- API Key 및 Secret Key를 환경 변수로 분리

### 6. Firebase 게시판

<p align="center">
  <!-- 권장 이미지: docs/images/board-list.png, docs/images/board-write.png -->
  <img src="./docs/images/board-list.png" width="48%" alt="게시판 목록" />
  <img src="./docs/images/board-write.png" width="48%" alt="게시글 작성" />
</p>

- 공지사항, 리뷰, Q&A, 이벤트 게시판 제공
- Firestore 기반 게시글 CRUD와 실시간 반영
- 게시글 검색 및 카테고리 필터
- 인증 사용자 글쓰기와 관리자 이벤트 관리

### 7. 로그인 및 회원가입

<p align="center">
  <!-- 권장 이미지: docs/images/login.png, docs/images/signup.png -->
  <img src="./docs/images/login.png" width="48%" alt="로그인" />
  <img src="./docs/images/signup.png" width="48%" alt="회원가입" />
</p>

- Firebase Authentication 기반 이메일 회원가입 및 로그인
- Google OAuth 소셜 로그인
- 인증 상태 자동 유지 및 사용자별 UI 변경
- Firestore 사용자 정보 저장

### 8. 다크모드 및 퀵 내비게이션

<p align="center">
  <!-- 권장 이미지: docs/images/theme.png, docs/images/quick-navigation.png -->
  <img src="./docs/images/theme.png" width="48%" alt="라이트 모드와 다크 모드" />
  <img src="./docs/images/quick-navigation.png" width="48%" alt="플로팅 퀵 내비게이션" />
</p>

- 전역 Theme Context 기반 테마 전환
- 이미지와 영상은 원본 색상을 유지하도록 예외 처리
- 카테고리, 장바구니, 페이지 상단으로 빠르게 이동
- 공통 컴포넌트로 구현해 모든 페이지에서 재사용

## 핵심 구현 내용

### 전역 상태 관리

Cart, Wishlist, Search, Theme Context를 목적별로 분리해 Props Drilling을 줄였습니다. 영속성이 필요한 장바구니와 위시리스트는 Local Storage와 동기화했습니다.

### 커머스 흐름

상품 목록, 상세 페이지, 검색, 장바구니, Checkout, 결제, 주문 완료를 하나의 사용자 흐름으로 연결했습니다. URL 기반 필터와 Dynamic Routing을 적용해 탐색 상태를 유지했습니다.

### 인증 및 게시판

Firebase Authentication과 Firestore를 연동해 로그인 사용자만 게시글을 작성할 수 있도록 구성했습니다. 사용자 권한에 따라 이벤트 관리 기능도 구분했습니다.

### 인터랙션

GSAP와 Motion으로 진입·스크롤·호버 애니메이션을 구현하고, Three.js로 브랜드 분위기에 맞는 3D 배경을 구성했습니다.

## Trouble Shooting

| 문제 | 원인 | 해결 및 결과 |
| --- | --- | --- |
| Windows 환경에서만 빌드 실패 | 운영체제별 파일명 처리 차이 | 파일명 규칙과 구조를 정리해 플랫폼과 관계없이 빌드 가능하도록 개선 |
| Polar.sh Secret Key 노출 위험 | 브라우저에서 결제 API 직접 호출 | Secret Key를 서버와 환경 변수에서만 관리하도록 변경 |
| GitHub Pages에서 결제 미동작 | 정적 호스팅은 서버 기능을 지원하지 않음 | 결제 서비스는 Vercel에 배포하고 GitHub는 저장소로 활용 |
| 다크모드에서 이미지까지 반전 | 상위 요소의 CSS Filter가 미디어에도 적용 | 이미지와 영상에 이중 반전 예외 처리 적용 |
| Firebase 설정 누락 시 앱 중단 | 초기화 전 인증 기능 호출 | 초기화 여부 확인과 fallback을 추가해 기본 화면 유지 |
| 이미지 교체 후 이전 이미지 표시 | 개발 서버 캐시와 이미지 관리 방식 | 파일명 규칙을 정리하고 변경 시 개발 서버를 재시작 |

## 성능 및 보안 개선

- 필요한 상태만 Context로 관리해 불필요한 전역 상태 최소화
- React Router 기반 SPA로 자연스러운 페이지 전환 제공
- 상품 데이터는 JSON으로 관리해 불필요한 API 요청 방지
- 실시간성이 필요한 게시판 데이터만 Firestore에서 관리
- API Key 및 Secret Key를 환경 변수와 서버로 분리
- 이미지 파일명 규칙을 통일해 자동 매핑 구조 적용

## 데이터 구조

### Product Data

```text
products
├─ id
├─ name
├─ price
├─ salePrice
├─ discountRate
├─ category
├─ colors[]
├─ description
├─ stock
├─ rating
├─ reviewCount
├─ reviewKeywords[]
├─ isBest
├─ isNew
├─ isSale
└─ reviews[]
```

### Firestore

```text
Firestore
├─ notices
├─ reviews
├─ qna
└─ events
```

## 프로젝트 구조

```text
src/
├─ assets/          # 이미지, 영상, 폰트 등 정적 에셋
├─ components/      # 재사용 가능한 UI 컴포넌트
├─ contexts/        # Cart, Wishlist, Search, Theme 상태
├─ data/            # 상품 및 정적 콘텐츠 데이터
├─ hooks/           # 공통 커스텀 훅
├─ layouts/         # 공통 페이지 레이아웃
├─ pages/           # 라우트별 페이지
├─ router/          # 라우팅 설정
├─ services/        # Firebase 및 외부 API 처리
├─ styles/          # 전역 스타일과 디자인 토큰
├─ utils/           # 공통 유틸리티
├─ App.jsx
└─ main.jsx
```

## 실행 방법

### 요구 환경

- Node.js 20 이상
- npm

### 설치 및 실행

```bash
git clone https://github.com/hong4745-cyber/onepage.git
cd onepage
npm install
npm run dev
```

개발 서버가 안내하는 로컬 주소로 접속합니다.

### 환경 변수

프로젝트 루트에 `.env` 파일을 만들고 Firebase 및 Polar.sh 설정을 입력합니다.

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_POLAR_ACCESS_TOKEN=your_token
```

> 실제 API Key와 Secret Key는 저장소에 커밋하지 않습니다. 결제용 Secret Key는 클라이언트가 아닌 서버 환경에서만 관리해야 합니다.

### 빌드

```bash
npm run build
npm run preview
```

## AI 활용

| AI 도구 | 활용 내용 |
| --- | --- |
| ChatGPT | 프로젝트 기획, UI/UX 개선, 코드 리뷰 및 README 작성 |
| Claude Code | 코드 분석 및 리팩터링 |
| Gemini | 기능 조사 및 구현 아이디어 검토 |

> AI가 생성한 결과를 그대로 사용하지 않고 프로젝트 목적에 맞게 수정·검증한 후 직접 구현했습니다.

## 개선 예정

- [ ] 관리자용 상품 등록 및 수정 기능
- [ ] JSON 상품 데이터를 Firestore 기반 관리 방식으로 전환
- [ ] Webhook을 활용한 주문 내역 자동 저장
- [ ] Lazy Loading 및 반응형 이미지 최적화
- [ ] Meta Tag와 Open Graph를 통한 SEO 개선
- [ ] Keyboard Navigation과 ARIA 속성 보완
- [ ] 상품 360° Viewer 기능 추가

## 프로젝트를 통해 배운 점

- React 컴포넌트 구조와 재사용 가능한 UI 설계 방법을 익혔습니다.
- Context API를 활용한 목적별 전역 상태 관리 경험을 쌓았습니다.
- Firebase Authentication과 Firestore를 연동해 실제 서비스 구조를 구현했습니다.
- 결제 시스템 연동 과정에서 서버 처리와 환경 변수 관리의 중요성을 배웠습니다.
- 운영체제와 배포 환경의 차이를 고려한 개발 및 디버깅 경험을 쌓았습니다.
- 브랜드 경험과 사용성을 함께 고려한 인터랙션 구현 방법을 익혔습니다.

## 프로젝트 회고

이번 프로젝트는 화면 구현을 넘어 실제 커머스 서비스의 전체 흐름을 직접 설계하고 연결한 프로젝트였습니다. React 컴포넌트 설계, Context API 상태 관리, Firebase 인증과 데이터 관리, Polar.sh 결제 연동을 적용하며 프론트엔드 서비스의 전반적인 구조를 경험했습니다.

다양한 문제를 해결하는 과정에서 배포 환경, 보안, 데이터 관리, 성능 최적화가 서비스 품질에 미치는 영향을 확인했습니다. 앞으로 관리자 기능과 상품 관리 시스템을 추가해 더욱 완성도 높은 커머스 프로젝트로 발전시킬 계획입니다.

## 이미지 추가 안내

README에서 사용한 이미지 경로는 다음과 같습니다. 저장소에 `docs/images/` 폴더를 만든 뒤 해당 이름으로 이미지를 추가하면 자동으로 표시됩니다.

```text
docs/images/
├─ main-preview.png
├─ hero.png
├─ product-list.png
├─ product-detail.png
├─ search-overlay.png
├─ cart.png
├─ wishlist.png
├─ checkout.png
├─ payment.png
├─ order-complete.png
├─ board-list.png
├─ board-write.png
├─ login.png
├─ signup.png
├─ theme.png
└─ quick-navigation.png
```

## License

본 프로젝트는 학습 및 포트폴리오 목적으로 제작되었습니다. Bowers & Wilkins 브랜드를 참고해 UI/UX를 리뉴얼했으며 상업적 목적의 공식 웹사이트가 아닙니다.

모든 상표와 브랜드의 권리는 해당 소유자에게 있습니다.
