import './CommunityPage.css';

const COMMUNITY_REVIEWS = [
  { rating: 5, tag: '베스트', text: '이곳은 독서에 대한 생각을 완전히 바꿔놓았어요. 모든 서가가 나에게 쓴 편지 같아요.', name: '이지원', meta: '2024년부터 회원' },
  { rating: 5, tag: '독서 모임', text: '매주 화요일 조용한 독서 모임은 일주일의 하이라이트예요. 따뜻한 차, 고요한 책장, 좋은 사람들.', name: '박민준', meta: '정기 방문자' },
  { rating: 4, tag: '추천 리뷰', text: '원하는 책을 찾지 못해도 상관없어요. 뜻밖의 문장이 가득한 공간이니까요. 나만의 피난처입니다.', name: '윤서연', meta: '동네 이웃' },
  { rating: 5, tag: '북클럽', text: '책을 읽는 동안 시간이 멈춘 것 같아요. 조용한 분위기와 따뜻한 조명이 완벽해요.', name: '나유진', meta: '북클럽 회원' },
  { rating: 5, tag: '인기 리뷰', text: '책 한 권 사러 왔다가 세 시간이나 머물렀어요. 이 분위기는 어디서도 재현할 수 없어요.', name: '최수연', meta: '첫 방문자' },
  { rating: 5, tag: '독서 공간', text: '조용히 흘러나오는 재즈와 종이 냄새가 어우러져 완벽한 몰입을 선사해 줍니다.', name: '강현우', meta: '주말 독서가' },
  { rating: 5, tag: '북큐레이션', text: '마음의 번잡함을 내려놓고 싶을 때마다 찾는 곳입니다. 큐레이터의 따뜻한 손길이 곳곳에 묻어나네요.', name: '한예진', meta: '정기 구독자', accent: 'green' },
  { rating: 5, tag: '공간 사용기', text: '책방에서 시간을 보내는 것이 가장 행복해요. 조용한 분위기와 책 냄새가 너무 좋아요.', name: '김다은', meta: '공간 사용자' },
  { rating: 5, tag: '북클럽', text: '방문할 때마다 예상치 못한 책 두 권을 발견하고 돌아가요. 큐레이션이 정말 특별해요.', name: '김하나', meta: '월간 구독자' },
  { rating: 5, tag: '공간 만족', text: '이곳의 차는 독서를 돕는 특별한 온도로 서빙되는 것 같습니다. 세심한 가치에 매료되었습니다.', name: '박민준', meta: '정기 방문자' },
  { rating: 5, tag: '심야 책방', text: '가끔 열리는 심야 책방 모임은 일상 속 소중한 숨구멍이에요. 오래오래 지켜줬으면 하는 공간.', name: '정유진', meta: '야간 회원' },
  { rating: 5, tag: '추천 리뷰', text: '책방에서 만난 새로운 책은 항상 기대가 돼요. 추천 서가가 너무 마음에 들어요.', name: '이한결', meta: '추천 리뷰어' },
];

function Stars({ rating }) {
  return (
    <div className="community-page__stars" aria-label={`별점 ${rating}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'is-filled' : ''}>★</span>
      ))}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <main className="community-page">
      <div className="community-page__inner">
        <header className="community-page__header">
          <a className="community-page__title" href="/">COMMUNITY</a>
          <p>BOOKCOVERS 공간과 책을 사랑하는 사람들의 진솔한 마음이 담긴 리뷰를 만나보세요.</p>
        </header>

        <ul className="community-page__list">
          {COMMUNITY_REVIEWS.map((review, index) => (
            <li className="community-page__card" key={`${review.name}-${index}`}>
              <Stars rating={review.rating} />
              <p className="community-page__review">&quot;{review.text}&quot;</p>
              <div className="community-page__author">
                <span className="community-page__avatar">{review.name.at(-1)}</span>
                <div>
                  <strong>{review.name}</strong>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="community-page__back-row">
          <a className="community-page__back" href="/#community">돌아가기</a>
        </div>
      </div>
    </main>
  );
}
