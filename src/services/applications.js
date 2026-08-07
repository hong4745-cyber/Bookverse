import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import { db } from '../lib/firebase';

export async function createProgramApplication({ program, selectedBooks, name, phone, paid }) {
  const payload = {
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
