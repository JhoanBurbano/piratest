import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  orderBy,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { PinUploaded } from '../interfaces/pin.interface';

class firestoreService {
  private COLLECTION_NAME = 'Pins';

  async createDocument(data: Omit<PinUploaded, 'id'>) {
    return await addDoc(collection(db, this.COLLECTION_NAME), data);
  }

  getAllDocumentsObserver(
    callback: (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
  ) {
    const orderedQuery = query(collection(db, this.COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(orderedQuery, callback);
    return unsubscribe;
  }

  async getAllDocuments() {
    const orderedQuery = query(collection(db, this.COLLECTION_NAME), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs<DocumentData, DocumentData>(orderedQuery);

    const matchingDocuments: PinUploaded[] = [];
    querySnapshot.forEach((doc) => {
      matchingDocuments.push({ ...doc.data(), id: doc.id } as PinUploaded);
    });

    return matchingDocuments;
  }

  async searchDocumentsByString(searchTags: string[]): Promise<PinUploaded[]> {
    const orderedQuery = query(
      collection(db, this.COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      where('tags', 'array-contains-any', searchTags),
    );

    const querySnapshot = await getDocs<DocumentData, DocumentData>(orderedQuery);

    const matchingDocuments: PinUploaded[] = [];
    querySnapshot.forEach((doc) => {
      matchingDocuments.push({ ...doc.data(), id: doc.id } as PinUploaded);
    });

    return matchingDocuments;
  }

  async getDocumentById(documentId: string) {
    const docSnapshot = await getDoc(doc(db, this.COLLECTION_NAME, documentId));
    return docSnapshot.exists()
      ? ({ id: docSnapshot.id, ...docSnapshot.data() } as PinUploaded)
      : null;
  }

  async updateDocumentById(documentId: string, data: Partial<PinUploaded>) {
    return await updateDoc(doc(db, this.COLLECTION_NAME, documentId), data);
  }

  async deleteDocumentById(documentId: string) {
    return await deleteDoc(doc(db, this.COLLECTION_NAME, documentId));
  }
}

export default new firestoreService();
