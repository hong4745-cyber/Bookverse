import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Header';
import Footer from './sections/Footer';
import FloatingActions from './FloatingActions';
import { auth } from '../lib/firebase';
import { getMyProgramApplications, getMySpaceReservations } from '../services/applications';
import './MyPage.css';

const STATUS_LABELS = {
  pending: '신청 확인 중',
  confirmed: '참여 확정',
  cancelled: '취소',
  completed: '참여 완료',
};

const PAYMENT_LABELS = {
  checking: '입금 확인 중',
  paid: '입금 완료',
  unpaid: '미입금',
};

const FILTERS = [
  ['all', '전체'],
  ['program', '프로그램'],
  ['bookClub', '북클럽'],
  ['space', '공간 예약'],
];

function getActivityType(activity) {
  if (activity.activityType === 'space') return 'space';
  return activity.bookTitles?.length ? 'bookClub' : 'program';
}

function getTypeLabel(type) {
  return { program: 'PROGRAM', bookClub: 'BOOK CLUB', space: 'SPACE' }[type];
}

function formatCreatedAt(timestamp) {
  if (!timestamp?.seconds) return '방금 신청';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(timestamp.seconds * 1000));
}

function getNextGuide(activity) {
  if (activity.status === 'confirmed') return '참여가 확정되었습니다. 일정에 맞춰 방문해 주세요.';
  if (activity.status === 'cancelled') return '취소된 신청입니다. 자세한 사항은 북커버스로 문의해 주세요.';
  if (activity.paymentStatus === 'unpaid') return '입금 완료 후 담당자가 신청을 확인합니다.';
  if (activity.paymentStatus === 'checking') return '입금 확인 중입니다. 확인 후 참여가 확정됩니다.';
  return '담당자가 신청 내용을 확인하고 있습니다.';
}

export default function MyPage() {
  const [user, setUser] = useState(undefined);
  const [activities, setActivities] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setError('');
    if (!currentUser) {
      setActivities([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [applications, reservations] = await Promise.all([
        getMyProgramApplications(currentUser.uid),
        getMySpaceReservations(currentUser.uid),
      ]);
      setActivities([...applications, ...reservations].sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      ));
    } catch (loadError) {
      console.error('MY 활동 내역 불러오기 실패', loadError);
      setError('활동 내역을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  }), []);

  const filteredActivities = useMemo(() => (
    activeFilter === 'all'
      ? activities
      : activities.filter((activity) => getActivityType(activity) === activeFilter)
  ), [activeFilter, activities]);

  const confirmedCount = activities.filter((activity) => activity.status === 'confirmed').length;
  const pendingCount = activities.filter((activity) => activity.status === 'pending').length;

  return (
    <>
      <Header />
      <main className="my-page">
        <section className="my-page__hero">
          <div className="inner">
            <span className="my-page__eyebrow">MY BOOKCOVERS</span>
            <h1>MY PAGE</h1>
            <p>신청한 프로그램과 북클럽, 공간 예약 내역을 자세히 확인하세요.</p>
          </div>
        </section>

        <section className="inner my-page__content">
          {user === undefined || loading ? (
            <p className="my-page__notice">나의 활동을 불러오는 중입니다.</p>
          ) : !user ? (
            <div className="my-page__empty">
              <strong>로그인이 필요합니다.</strong>
              <p>상단의 LOGIN 버튼을 눌러 로그인하면 나의 활동을 확인할 수 있어요.</p>
            </div>
          ) : error ? (
            <p className="my-page__notice is-error">{error}</p>
          ) : (
            <>
              <section className="my-page__profile" aria-label="회원 정보">
                <div>
                  <span className="my-page__profile-label">MEMBER</span>
                  <h2>{user.displayName || 'BOOKCOVERS 독자'}</h2>
                  <p>{user.email}</p>
                </div>
                <dl className="my-page__summary">
                  <div><dt>전체 활동</dt><dd>{activities.length}</dd></div>
                  <div><dt>확정</dt><dd>{confirmedCount}</dd></div>
                  <div><dt>확인 중</dt><dd>{pendingCount}</dd></div>
                </dl>
              </section>

              <div className="my-page__activity-head">
                <div>
                  <span>ACTIVITY</span>
                  <h2>나의 활동</h2>
                </div>
                <div className="my-page__filters" aria-label="활동 종류 필터">
                  {FILTERS.map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={activeFilter === value ? 'is-active' : ''}
                      onClick={() => setActiveFilter(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredActivities.length === 0 ? (
                <div className="my-page__empty my-page__empty--activity">
                  <strong>{activities.length ? '해당하는 활동이 없습니다.' : '아직 참여 중인 활동이 없습니다.'}</strong>
                  <p>BOOKCOVERS의 프로그램을 둘러보고 첫 활동에 참여해 보세요.</p>
                  <a href="/#programs">프로그램 보러 가기</a>
                </div>
              ) : (
                <ul className="my-page__list">
                  {filteredActivities.map((activity) => {
                    const type = getActivityType(activity);
                    const isSpace = type === 'space';
                    return (
                      <li className="my-page__card" key={`${type}-${activity.id}`}>
                        <div className="my-page__card-head">
                          <span>{getTypeLabel(type)}</span>
                          <strong className={`is-${activity.status || 'pending'}`}>
                            {STATUS_LABELS[activity.status] || activity.status || '신청 확인 중'}
                          </strong>
                        </div>

                        <div className="my-page__card-title">
                          <h3>{isSpace ? (activity.spaceName || 'BOOKCOVERS 공간 예약') : activity.programTitle}</h3>
                          <span>신청번호 {activity.id.slice(0, 8).toUpperCase()}</span>
                        </div>

                        {activity.bookTitles?.length > 0 && (
                          <div className="my-page__selected-books">
                            <span>선택 도서</span>
                            <p>{activity.bookTitles.join(', ')}</p>
                          </div>
                        )}

                        <dl className="my-page__details">
                          <div><dt>신청일</dt><dd>{formatCreatedAt(activity.createdAt)}</dd></div>
                          <div><dt>일정</dt><dd>{isSpace ? `${activity.date || '날짜 확인 중'} ${activity.time || ''}` : (activity.schedule || '일정 확인 중')}</dd></div>
                          {isSpace && <div><dt>인원</dt><dd>{activity.people ? `${activity.people}명` : '확인 중'}</dd></div>}
                          {!isSpace && <div><dt>입금</dt><dd>{PAYMENT_LABELS[activity.paymentStatus] || activity.paymentStatus || '확인 중'}</dd></div>}
                          <div><dt>신청자</dt><dd>{activity.name || user.displayName || '-'}</dd></div>
                          <div><dt>연락처</dt><dd>{activity.phone || '-'}</dd></div>
                        </dl>

                        <div className="my-page__guide">
                          <span>NEXT</span>
                          <p>{getNextGuide(activity)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
