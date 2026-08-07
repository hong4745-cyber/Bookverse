import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore/lite';
import { auth, db } from '../lib/firebase';

export async function createProgramApplication({ program, selectedBooks, name, phone, paid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');

  const payload = {
    userId: user.uid,
    userEmail: user.email || '',
    programId: program.id,
    programTitle: program.title.replace(/\n/g, ' '),
    schedule: program.schedule,
    bookIds: selectedBooks.map((book) => book.id),
    bookTitles: selectedBooks.map((book) => book.title),
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

  return snapshot.docs
    .map((application) => ({ id: application.id, ...application.data() }))
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
}

export async function createBookClubApplication({ book, name, phone, paid }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');

  const documentRef = await addDoc(collection(db, 'programApplications'), {
    userId: user.uid,
    userEmail: user.email || '',
    programId: `book-club-${book.id}`,
    programTitle: `북클럽 · ${book.title}`,
    schedule: book.date,
    bookIds: [book.id],
    bookTitles: [book.title],
    name: name.trim(),
    phone: phone.trim(),
    paymentStatus: paid ? 'checking' : 'unpaid',
    status: 'pending',
    source: 'book-club-modal',
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
