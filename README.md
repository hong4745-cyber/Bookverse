# 📚 BOOKCOVERS

> **취향과 관점을 중심으로 책, 큐레이션, 프로그램, 공간을 연결하는 독립서점 브랜드 랜딩페이지**

<img width="435" height="3522" alt="Image" src="https://github.com/user-attachments/assets/5aff1b10-c31a-472e-b0ec-4e4a6ba204e6" />


---

# ✨ 프로젝트 소개

BOOKCOVERS는 독립서점의 브랜드 경험을 웹으로 확장한 React 기반 데스크톱 랜딩페이지입니다. 화면은 `1920 × 1080` 해상도를 기준으로 제작했습니다.

단순히 도서를 나열하는 화면을 넘어 책 표지 마키, 스크롤 기반 아트워크, 3D 인터랙티브 북을 통해 브랜드의 취향과 관점을 시각적으로 전달합니다. 추천 도서와 큐레이션 탐색부터 프로그램 신청, 공간 예약, 로그인, 사용자별 활동 확인까지 하나의 서비스 흐름으로 구성했습니다.

---

# ✨ Highlights

- ✔ React 19 기반 `1920 × 1080` 데스크톱 웹 구현
- ✔ GSAP·ScrollTrigger 기반 가로형 히어로 스크롤
- ✔ 책 표지와 텍스트가 교차하는 무한 마키
- ✔ CSS 3D Transform 기반 인터랙티브 북
- ✔ Firebase Authentication 로그인
- ✔ Firestore 기반 프로그램 신청 및 공간 예약
- ✔ 중복 신청 방지와 북클럽 일정 충돌 검증
- ✔ 서점 위치 안내를 위한 Naver Maps API 연동
- ✔ 사용자별 신청·예약 내역 확인 및 취소를 제공하는 마이페이지
- ✔ 고정 내비게이션에서 각 콘텐츠 섹션으로 바로 이동하는 앵커 내비게이션
- ✔ 커뮤니티 리뷰 상세 페이지와 메인 COMMUNITY 섹션 복귀 흐름
- ✔ 해상도 안내 팝업과 `12시간 동안 보지 않기` 설정
- ✔ `prefers-reduced-motion`을 고려한 모션 최적화
- ✔ 기획부터 디자인 구체화, 개발, 배포까지 100% 직접 구현

---

# 🎯 Project Goals

- 독립서점의 취향과 관점을 전달하는 브랜드 경험 구현
- 스크롤과 인터랙션을 활용한 몰입도 높은 랜딩페이지 제작
- 도서·프로그램·공간·커뮤니티 콘텐츠를 하나의 흐름으로 연결
- React 컴포넌트와 데이터 중심의 확장 가능한 구조 설계
- Firebase 기반 인증과 사용자 데이터 관리
- `1920 × 1080` 환경에 최적화된 데스크톱 UI 구현
- 시각적 완성도와 실제 신청·예약 기능의 균형 확보

---

# 📋 프로젝트 정보

| 항목 | 내용 |
| --- | --- |
| **프로젝트명** | BOOKCOVERS |
| **프로젝트 유형** | 독립서점 브랜드·서비스 데스크톱 랜딩페이지 |
| **작업 기간** | 2026.08 3일 |
| **개발 인원** | 1인 프로젝트 |
| **담당 역할** | 기획 · UI 디자인 구체화 · 프론트엔드 개발 · Firebase 연동 · 배포 |
| **기여도** | 100% |
| **배포 환경** | Vercel |

---

# 🛠 Tech Stack

## 💻 Front-end

<p>
  <img src="https://skillicons.dev/icons?i=react" width="22" alt="React" /> <strong>React 19</strong>
  &nbsp;&nbsp;
  <img src="https://skillicons.dev/icons?i=vite" width="22" alt="Vite" /> <strong>Vite 6</strong>
  &nbsp;&nbsp;
  <img src="https://skillicons.dev/icons?i=js" width="22" alt="JavaScript" /> <strong>JavaScript</strong>
  &nbsp;&nbsp;
  <img src="https://skillicons.dev/icons?i=css" width="22" alt="CSS" /> <strong>CSS</strong>
</p>

- React 컴포넌트 기반 UI
- `1920 × 1080` 기준의 데스크톱 레이아웃
- 콘텐츠 데이터와 화면 컴포넌트 분리
- 재사용 가능한 섹션 및 모달 구조

---

## 🔥 Backend

<p>
  <img src="https://skillicons.dev/icons?i=firebase" width="22" alt="Firebase" /> <strong>Firebase</strong>
</p>

- Firebase Authentication
- Cloud Firestore
- 사용자별 프로그램 신청 및 공간 예약 데이터 관리
- UID 기반 데이터 접근 제어

---

## 🎬 Animation

- GSAP
- ScrollTrigger
- Motion
- CSS 3D Transform

---

## 🗺 External API

- Naver Maps API

---

## 🛠 Tools

<p>
  <img src="https://skillicons.dev/icons?i=vscode,git,github,vercel" alt="VS Code, Git, GitHub, Vercel" />
</p>

- VS Code
- Git
- GitHub
- Vercel
- Oxlint

---

# 🤖 AI 활용

| AI | 활용 내용 |
| --- | --- |
| Claude Code | 코드 분석 및 리팩토링 |
| ChatGPT | 이미지 생성, README 작성, 프로젝트 기획 |
| Claude | 기능 조사 및 구현 아이디어 검토 |

### 직접 구현한 내용

- 브랜드 콘셉트와 페이지 구성 기획
- 화면별 레이아웃, 타이포그래피, 컬러 및 그래픽 방향 결정
- React 컴포넌트와 콘텐츠 데이터 구조 설계
- 프로그램 신청, 공간 예약, 로그인 및 마이페이지 흐름 구현
- 실제 콘텐츠와 이미지 적용 및 인터랙션 세부 조정

> AI는 구현과 검증을 보조하는 도구로 활용했으며, 최종 기능·디자인 판단과 결과물 검수는 직접 수행했습니다.

---

# 🔗 프로젝트 링크

| Resource | Link |
| --- | --- |
| 🌐 Live Demo | [BOOKCOVERS 바로가기](https://bookverse-app-olive.vercel.app/) |
| 💻 GitHub Repository | [Bookverse Repository](https://github.com/hong4745-cyber/Bookverse) |

---

# 📖 프로젝트 개요

BOOKCOVERS는 독립서점의 큐레이션 관점과 오프라인 경험을 온라인으로 확장하기 위해 제작한 브랜드 랜딩페이지입니다.

방문자는 책 표지와 텍스트가 교차하는 무한 마키와 가로형 히어로 스크롤을 통해 브랜드의 분위기를 경험하고, 추천 도서·북클럽·큐레이션 콘텐츠를 탐색할 수 있습니다. 로그인 후에는 프로그램 신청과 공간 예약을 진행하고 마이페이지에서 자신의 활동 내역을 확인할 수 있습니다.

브랜드 중심의 시각적 경험과 실제 사용 가능한 서비스 기능을 하나의 React 프로젝트 안에 연결했다는 점이 핵심입니다.

---

# 🚀 주요 기능

## 1. 🎞 가로형 Hero Scroll

<p align="center">
  <img width="1988" height="961" alt="Image" src="https://github.com/user-attachments/assets/ede5a654-7a53-43aa-b504-8ba3b070ba6a" />
</p>

### ✨ 주요 기능

- 세 개의 히어로 섹션을 하나의 화면에서 가로로 전환
- 화면 단위 스냅을 적용해 정확한 프레임에서 정지
- 스크롤 진행에 따라 이미지와 텍스트가 유기적으로 변화
- 모션 감소 설정을 고려한 대체 동작 제공

### 💻 구현 내용

- GSAP Timeline과 ScrollTrigger 결합
- 고정된 화면 내부에서 가로 트랙 이동
- `steps()` 기반 프레임 전환과 스냅 적용
- `transform` 중심 애니메이션으로 렌더링 성능 개선

---

## 2. 📚 Infinite Book Marquee

<p align="center">
 <img width="1346" height="848" alt="Image" src="https://github.com/user-attachments/assets/851f59be-25ec-410e-9b10-68a91173666b" />
</p>

### ✨ 주요 기능

- 책 표지와 텍스트가 끊김 없이 반복되는 마키
- 홀수·짝수 행이 서로 반대 방향으로 이동
- 다양한 도서 콘텐츠를 리듬감 있게 노출
- `1920 × 1080` 화면을 기준으로 자연스럽게 이어지는 트랙

### 💻 구현 내용

- 동일한 콘텐츠 묶음을 반복 렌더링해 루프 구성
- 실제 트랙 너비를 기준으로 이동 거리 계산
- `will-change: transform` 적용
- 공통 hover 규칙과 애니메이션 충돌 제거

---

## 3. 📕 3D Interactive Book

<p align="center">
  <img width="1988" height="961" alt="Image" src="https://github.com/user-attachments/assets/1c67fca0-89b1-4014-9553-4f138cbec7a7" />
</p>

### ✨ 주요 기능

- 마우스 움직임에 반응하는 3D 도서 오브젝트
- 책의 앞면, 뒷면, 책등과 페이지 면 표현
- 사용자가 책을 직접 돌려보는 듯한 상호작용
- 콘텐츠 탐색 과정에 시각적 몰입감 제공

### 💻 구현 내용

- 각 면을 개별 요소로 분리한 뒤 CSS 3D Transform으로 결합
- 포인터 위치를 X·Y축 회전값으로 변환
- 위치 계산과 회전을 다른 요소로 분리해 transform 충돌 방지

---

## 4. 📖 도서·북클럽·큐레이션

<p align="center">
  <img width="2049" height="5397" alt="Image" src="https://github.com/user-attachments/assets/1b8a7f4d-1a0c-4f6d-a363-c44ed6a378e3" />
</p>

### ✨ 주요 기능

- 추천 도서와 북클럽 프로그램 소개
- 독립서점의 관점을 담은 큐레이션 콘텐츠 제공
- 책, 프로그램, 공간을 연결하는 콘텐츠 흐름
- 정적 데이터를 활용한 일관된 콘텐츠 관리

### 💻 구현 내용

- 도서·프로그램·공간·커뮤니티 데이터를 `src/data`로 분리
- 반복 가능한 카드와 섹션 컴포넌트 설계
- 실제 콘텐츠와 이미지를 데이터에 매핑

---

## 5. 📝 프로그램 신청

<p align="center">
  <img width="2022" height="1012" alt="Image" src="https://github.com/user-attachments/assets/58a37065-773c-45da-bf9c-55ff051c8804" />
  <img width="1002" height="1705" alt="Image" src="https://github.com/user-attachments/assets/a313dc7d-2904-48ed-b8ed-04a2fe3c2a97" />
</p>

### ✨ 주요 기능

- 북클럽과 프로그램 상세 정보 확인
- 로그인 사용자 프로그램 신청
- 신청자 정보와 프로그램 정보 저장
- 입금 상태 안내 및 사용자별 신청 내역 확인
- 동일 프로그램의 중복 신청 사전 차단
- 북클럽은 책 제목과 일정이 모두 다를 때 별도 신청 허용

### 💻 구현 내용

- Firebase Authentication의 사용자 UID 연동
- Firestore에 프로그램 및 신청자 데이터 저장
- 책 ID와 북클럽 일정을 함께 저장해 중복·시간 충돌 검사
- 사용자 본인의 신청 데이터만 조회하도록 보안 규칙 구성
- 신청 상태를 마이페이지에 반영

---

## 6. 🏠 공간 예약

<p align="center">
  <img width="2016" height="987" alt="Image" src="https://github.com/user-attachments/assets/e07999b8-6485-4514-8331-1df07bc9d7bf" />
  <img width="1857" height="982" alt="Image" src="https://github.com/user-attachments/assets/d025aef1-64cc-4471-a155-5584d9b310ce" />
</p>

### ✨ 주요 기능

- 독립서점 공간 정보 제공
- 모달에서 날짜, 시간, 인원 선택
- 로그인 사용자 예약 정보 저장
- 마이페이지에서 예약 상태 확인
- 예약 완료 후 마이페이지에서 직접 취소

### 💻 구현 내용

- 재사용 가능한 예약 모달 컴포넌트 구현
- 예약 정보와 사용자 UID를 Firestore에 저장
- 입력값 검증 및 예약 상태 데이터 관리
- 본인 예약만 취소할 수 있도록 Firestore 보안 규칙 제한

---

## 7. 🔐 로그인 및 마이페이지

<p align="center">
  <img width="1685" height="986" alt="Image" src="https://github.com/user-attachments/assets/9fb4fb28-4f3a-4511-8ffb-a9a5bba53f24" />
  <img width="2049" height="7094" alt="Image" src="https://github.com/user-attachments/assets/29e5bfd5-71bf-4e4f-856f-0d289f59639b" />
</p>

### ✨ 주요 기능

- Firebase 기반 사용자 로그인
- 인증 상태에 따른 화면과 기능 변경
- 프로그램 신청 및 공간 예약 내역 확인
- 북클럽을 프로그램 활동에 통합해 한 화면에서 관리
- 프로그램 신청과 공간 예약 취소

### 💻 구현 내용

- Firebase Authentication 연동
- 인증 사용자 UID 기반 데이터 조회
- 신청·예약 컬렉션을 사용자별로 필터링
- 기존 중복 신청 데이터는 프로그램과 책 조합별 최신 한 건만 표시
- 취소 시 카드 상태를 즉시 갱신하고 Firestore에 반영
- 비로그인 사용자의 보호 기능 접근 제한

---

## 8. 💬 Community & Floating UI

<p align="center">
  <img width="2049" height="3171" alt="Image" src="https://github.com/user-attachments/assets/8220b8b1-056e-49b5-a859-ae949980e866" />
  <img width="1772" height="902" alt="Image" src="https://github.com/user-attachments/assets/280a1070-c3e8-440d-bb8c-8971bca07581" />
</p>

### ✨ 주요 기능

- 독립서점의 소식과 커뮤니티 콘텐츠 제공
- 메인 COMMUNITY 섹션과 전체 리뷰를 제공하는 `/community` 상세 페이지
- 상세 페이지 하단의 `돌아가기` 버튼을 통한 COMMUNITY 섹션 복귀
- 주요 기능에 빠르게 접근하는 플로팅 액션 UI
- 페이지 흐름을 방해하지 않는 고정형 내비게이션과 섹션 직접 이동

### 💻 구현 내용

- 공통 컴포넌트로 설계해 화면 간 재사용
- `1920 × 1080` 레이아웃을 기준으로 고정 위치 조정
- 콘텐츠 영역과 겹치지 않도록 레이아웃 조정
- CSS Module 클래스명 대신 `#books`, `#visit`, `#community` 등의 고정 앵커 사용
- GSAP 고정 스크롤 레이아웃 계산 후 URL 해시 위치를 다시 적용해 다른 페이지에서도 정확한 섹션 이동 지원

---

## 9. 🗺 서점 위치 안내

<p align="center">
  <img width="2049" height="1480" alt="Image" src="https://github.com/user-attachments/assets/930a0ada-005f-419f-89b5-1548c3170015" />
</p>

### ✨ 주요 기능

- Naver Maps API를 사용한 서점 위치 표시
- 방문에 필요한 위치 정보 제공
- 랜딩페이지 안에서 온라인과 오프라인 경험 연결

### 💻 구현 내용

- Naver Maps API 연동
- 클라이언트 ID를 환경 변수로 분리
- API 키에 허용 도메인과 사용량 제한 적용

---

# 💡 핵심 구현 내용

## ⚛️ React

- React 19 기반 컴포넌트 구조
- 공통 UI, 모달, 메인 섹션 분리
- 도서와 프로그램 데이터를 화면 로직에서 분리
- 재사용 가능한 섹션 컴포넌트 설계

---

## 🎬 Scroll & Motion

- GSAP Timeline과 ScrollTrigger 기반 가로 스크롤
- 화면 단위 스냅과 실제 트랙 위치 기반 상태 계산
- 무한 마키와 아트워크 슬라이더
- `prefers-reduced-motion` 대응

---

## 📕 3D Interaction

- CSS 3D Transform 기반 책 오브젝트
- 포인터 위치 기반 회전값 계산
- 위치와 회전을 분리해 transform 충돌 방지

---

## 🔥 Firebase

- Firebase Authentication
- 프로그램 신청 및 공간 예약 데이터 저장
- 사용자 UID 기반 데이터 연결
- 프로그램·책·일정 조합을 이용한 중복 신청 검사
- 본인 신청의 `cancelled` 상태 변경만 허용하는 보안 규칙
- Firestore 보안 규칙을 통한 본인 데이터 접근 제한

---

## 📱 UI / UX

- 브랜드 중심의 타이포그래피와 그래픽 구성
- `1920 × 1080` 데스크톱 화면에 최적화된 UI
- 스크롤 상태와 슬라이드 화면 동기화
- 키보드, 터치, 모션 감소 설정 고려
- 고정 헤더 높이와 섹션별 여백을 반영한 앵커 이동 위치 보정
- 권장 해상도 안내 팝업에 `localStorage` 만료 시각을 저장해 12시간 동안 재노출 방지

---

# 🔧 Trouble Shooting

## 1. 마키가 호버 시 정지

### 문제

책 표지 위에 커서를 올리면 무한 마키가 멈췄습니다.

### 원인

공통 hover 스타일에 애니메이션을 중단하는 규칙이 포함되어 있었습니다.

### 해결

마키에 영향을 주는 hover 일시정지 규칙을 제거했습니다.

### 결과

사용자 포인터 상태와 관계없이 마키가 자연스럽게 이어집니다.

---

## 2. 회전 도형이 중심에서 벗어나는 문제

### 문제

위치 이동용 `translate`와 회전용 `rotate`가 동일한 요소에서 충돌했습니다.

### 해결

위치는 계산값으로 고정하고 회전은 중앙 요소에서만 처리하도록 역할을 분리했습니다.

### 결과

도형과 3D 오브젝트가 중심을 유지한 채 안정적으로 회전합니다.

---

## 3. 배포 파일 용량 증가

### 문제

로컬 영상과 검증용 빌드 파일이 배포 대상에 포함되어 용량이 증가했습니다.

### 해결

Vite 복사 필터와 `.vercelignore`를 적용해 불필요한 파일을 제외했습니다.

### 결과

프로덕션 배포 용량과 빌드 부담을 줄였습니다.

---

# ⚡ 성능 최적화

| 항목 | 적용 내용 |
| --- | --- |
| Transform | 움직이는 요소를 `transform`과 `opacity` 중심으로 애니메이션 |
| 렌더링 힌트 | 주요 트랙에 `will-change: transform` 적용 |
| 데이터 재사용 | 반복되는 책 데이터를 재사용해 불필요한 요청 방지 |
| 배포 용량 | 프로덕션 빌드에서 대용량 로컬 영상 제외 |
| 빌드 | Vercel 빌드 캐시 활용 |
| 접근성 | `prefers-reduced-motion`에서 불필요한 모션 제한 |

---

# 🗄️ 데이터 구조

```text
programApplications/{applicationId}
├─ userId
├─ programId
├─ programTitle
├─ schedule
├─ bookIds
├─ bookTitles
├─ bookSchedules
├─ name
├─ phone
├─ paymentStatus
├─ status
└─ createdAt

spaceReservations/{reservationId}
├─ userId
├─ spaceName
├─ name
├─ phone
├─ date
├─ time
├─ people
├─ status
└─ createdAt
```

정적 도서·프로그램·공간·커뮤니티 콘텐츠는 `src/data`에서 화면 컴포넌트와 분리해 관리합니다.

---

# 📁 프로젝트 구조

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

---

# ▶️ 실행 방법

## 1. 저장소 클론

```bash
git clone https://github.com/hong4745-cyber/Bookverse.git
```

## 2. 프로젝트 폴더 이동

```bash
cd Bookverse
```

## 3. 패키지 설치

```bash
npm install
```

## 4. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일에 Firebase와 네이버 지도 설정을 입력합니다.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_NAVER_MAP_CLIENT_ID=
```

> `.env.local`과 실제 API 키는 저장소에 포함하지 않습니다. 외부 API 키에는 허용 도메인과 사용량 제한을 설정해야 합니다.

## 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 6. 프로덕션 빌드

```bash
npm run build
npm run preview
```

---

# 🚀 배포

| 구분 | 주소 |
| --- | --- |
| 🌐 Live Demo | [https://bookverse-app-olive.vercel.app/](https://bookverse-app-olive.vercel.app/) |
| 📂 Repository | [https://github.com/hong4745-cyber/Bookverse](https://github.com/hong4745-cyber/Bookverse) |

---

# 🔮 개선 예정

| 항목 | 내용 |
| --- | --- |
| 번들 | 코드 스플리팅으로 초기 로딩 크기 축소 |
| 이미지 | WebP·AVIF 변환과 고해상도 이미지 최적화 |
| 관리자 | 프로그램 및 예약 관리 화면 추가 |
| 상태 관리 | 결제·입금 확인 상태 자동화 |
| 테스트 | E2E 테스트와 시각 회귀 테스트 도입 |
| 접근성 | 모바일 제스처와 키보드 접근성 개선 |

---

# 📚 프로젝트를 통해 배운 점

- 스크롤 진행률과 실제 화면 상태를 분리하면 인터랙션 동기화 문제가 발생할 수 있음을 배웠습니다.
- 애니메이션은 시각적 효과뿐 아니라 키보드, 터치, 모션 감소 설정까지 함께 고려해야 합니다.
- 인증과 데이터 저장은 UI 구현과 동시에 보안 규칙을 설계해야 안전한 서비스가 됩니다.
- 배포 환경에서는 로컬 개발과 다른 파일 용량, 캐시, 환경 변수 조건을 별도로 검증해야 합니다.
- 브랜드 중심의 시각적 랜딩페이지와 실제 서비스 기능을 하나의 사용자 흐름으로 연결하는 경험을 쌓았습니다.

---

# 📝 프로젝트 회고

BOOKCOVERS를 통해 브랜드 중심의 시각적 웹사이트와 실제 신청·예약 기능을 하나의 React 프로젝트로 연결했습니다.

반복 마키, 고정형 가로 스크롤, 3D 도서처럼 복합적인 인터랙션을 구현하면서 화면에 보이는 프레임과 상태 관리의 동기화가 사용자 경험에 직접 영향을 준다는 점을 확인했습니다. 또한 Firebase 인증 및 데이터 저장 기능을 적용하며 시각적 완성도뿐 아니라 보안 규칙과 사용자별 데이터 흐름도 함께 설계해야 한다는 점을 배웠습니다.

앞으로는 현재의 브랜드 경험을 유지하면서 번들 최적화, 자동화 테스트, 관리자 기능과 접근성을 보강할 계획입니다.

---

# 🖼️ 이미지 관리 안내

- README의 프로젝트 화면 이미지는 GitHub User Attachments URL을 사용합니다.
- README 이미지를 교체할 때는 해당 `<img>` 요소의 `src`, `width`, `height`, `alt` 속성을 함께 갱신합니다.
- 애플리케이션에서 사용하는 도서 표지, 장식 그래픽, 지도 관련 이미지는 `public/images/`에서 관리합니다.
- 사용하지 않는 대용량 이미지와 로컬 검증용 빌드 결과물은 배포 대상에 포함하지 않습니다.

---

# 📄 License

본 프로젝트는 학습 및 포트폴리오 목적으로 제작되었습니다.

프로젝트에 포함된 도서 이미지, 폰트 및 브랜드 에셋의 저작권은 각 원저작자에게 있으며 별도의 허가 없이 상업적으로 사용할 수 없습니다. 코드 사용 범위는 저장소의 라이선스 정책을 따릅니다.

