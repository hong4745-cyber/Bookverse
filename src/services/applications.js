import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore/lite';
import { auth, db } from '../lib/firebase';

export async function hasProgramApplication(programId, { bookIds = [], schedules = [] } = {}) {
  const user = auth.currentUser;
  if (!user || !programId) return false;

  const snapshot = await getDocs(query(
    collection(db, 'programApplications'),
    where('userId', '==', user.uid),
  ));

  const matchingApplications = snapshot.docs
    .map((application) => application.data())
    .filter((application) => application.programId === programId);

  if (bookIds.length === 0 && schedules.length === 0) return matchingApplications.length > 0;

  return matchingApplications.some((application) => {
    const savedBookIds = application.bookIds || [];
    const savedSchedules = application.bookSchedules || [];
    if (savedBookIds.length === 0 && savedSchedules.length === 0) return true;
    return savedBookIds.some((bookId) => bookIds.includes(bookId))
      || savedSchedules.some((schedule) => schedules.includes(schedule));
  });
}

export async function createProgramApplication({ program, selectedBooks, name, phone, paid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');
  const bookIds = selectedBooks.map((book) => book.id);
  const bookSchedules = selectedBooks.map((book) => book.date);
  if (await hasProgramApplication(program.id, { bookIds, schedules: bookSchedules })) {
    throw new Error('duplicate-application');
  }

  const payload = {
    userId: user.uid,
    userEmail: user.email || '',
    programId: program.id,
    programTitle: program.title.replace(/\n/g, ' '),
    schedule: bookSchedules.length > 0 ? bookSchedules.join(' / ') : program.schedule,
    bookIds,
    bookTitles: selectedBooks.map((book) => book.title),
    bookSchedules,
    name: name.trim(),
    phone: phone.trim(),
    paymentStatus: paid ? 'checking' : 'unpaid',
    status: 'pending',
    source: 'web',
    createdAt: serverTimestamp(),
  };

  const documentRef = await addDoc(collection(db, 'programApplications'), payload);
  return documentRef.id;
}

export async function getMyProgramApplications(userId) {
  if (!userId) return [];
  const snapshot = await getDocs(query(
    collection(db, 'programApplications'),
    where('userId', '==', userId),
  ));

  const applications = snapshot.docs
    .map((application) => ({ id: application.id, ...application.data() }))
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

  const seenApplications = new Set();
  return applications.filter((application) => {
    const bookKey = application.bookIds?.length
      ? [...application.bookIds].sort().join(',')
      : '';
    const applicationKey = `${application.programId || application.id}:${bookKey}`;
    if (seenApplications.has(applicationKey)) return false;
    seenApplications.add(applicationKey);
    return true;
  });
}

export async function createBookClubApplication({ book, name, phone, paid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');
  const programId = `book-club-${book.id}`;
  if (await hasProgramApplication(programId)) throw new Error('duplicate-application');

  const documentRef = await addDoc(collection(db, 'programApplications'), {
    userId: user.uid,
    userEmail: user.email || '',
    programId,
    programTitle: `북클럽 · ${book.title}`,
    schedule: book.date,
    bookIds: [book.id],
    bookTitles: [book.title],
    bookSchedules: [book.date],
    name: name.trim(),
    phone: phone.trim(),
    paymentStatus: paid ? 'checking' : 'unpaid',
    status: 'pending',
    source: 'book-club-modal',
    createdAt: serverTimestamp(),
  });

  return documentRef.id;
}

export async function createSpaceReservation({ name, phone, date, time, people }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');

  const documentRef = await addDoc(collection(db, 'spaceReservations'), {
    userId: user.uid,
    userEmail: user.email || '',
    spaceName: 'BOOKCOVERS 다락 세미나실',
    name: name.trim(),
    phone: phone.trim(),
    date,
    time,
    people,
    status: 'pending',
    source: 'web',
    createdAt: serverTimestamp(),
  });

  return documentRef.id;
}

export async function getMySpaceReservations(userId) {
  if (!userId) return [];
  const snapshot = await getDocs(query(
    collection(db, 'spaceReservations'),
    where('userId', '==', userId),
  ));

  return snapshot.docs.map((reservation) => ({
    id: reservation.id,
    activityType: 'space',
    ...reservation.data(),
  }));
}

export async function cancelMyActivity({ id, activityType }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');
  if (!id) throw new Error('invalid-activity');

  const collectionName = activityType === 'space'
    ? 'spaceReservations'
    : 'programApplications';
  await updateDoc(doc(db, collectionName, id), { status: 'cancelled' });
}
