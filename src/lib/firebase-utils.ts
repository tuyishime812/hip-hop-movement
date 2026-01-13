// src/lib/firebase-utils.ts - Additional Firebase utilities for the Hip-Hop Foundation website

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  startAfter,
  limit,
  QueryConstraint,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// Check if running on client side before using Firebase
const isClient = typeof window !== 'undefined';

/**
 * Generic function to get documents from a collection with optional query constraints
 */
export const getCollectionWithConstraints = async (
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<DocumentData[]> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return [];
  }

  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    return [];
  }
};

/**
 * Function to check if a document exists in a collection
 */
export const documentExists = async (
  collectionName: string,
  documentId: string
): Promise<boolean> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return false;
  }

  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDocs(query(collection(db, collectionName), where('__name__', '==', documentId)));
    return !docSnap.empty;
  } catch (error) {
    console.error(`Error checking if document exists in ${collectionName}:`, error);
    return false;
  }
};

/**
 * Function to increment a numeric field in a document
 */
export const incrementField = async (
  collectionName: string,
  documentId: string,
  fieldName: string,
  incrementValue: number = 1
): Promise<boolean> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return false;
  }

  try {
    const docRef = doc(db, collectionName, documentId);
    const currentDoc = await getDocs(query(collection(db, collectionName), where('__name__', '==', documentId)));

    if (!currentDoc.empty) {
      const data = currentDoc.docs[0].data();
      const currentValue = data[fieldName] || 0;
      await updateDoc(docRef, {
        [fieldName]: currentValue + incrementValue
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error incrementing field ${fieldName} in ${collectionName}:`, error);
    return false;
  }
};

/**
 * Function to add a new document and return the ID
 */
export const addDocumentWithId = async (
  collectionName: string,
  data: Record<string, any>
): Promise<string | null> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return null;
  }
};

/**
 * Function to update a document with timestamp
 */
export const updateDocumentWithTimestamp = async (
  collectionName: string,
  documentId: string,
  data: Record<string, any>
): Promise<boolean> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return false;
  }

  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updated_at: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    return false;
  }
};

/**
 * Function to batch delete documents based on a condition
 */
export const batchDeleteDocuments = async (
  collectionName: string,
  field: string,
  operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any',
  value: any
): Promise<number> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return 0;
  }

  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);
    return querySnapshot.size;
  } catch (error) {
    console.error(`Error batch deleting documents from ${collectionName}:`, error);
    return 0;
  }
};

/**
 * Function to get a document by ID
 */
export const getDocumentById = async (
  collectionName: string,
  documentId: string
): Promise<DocumentData | null> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return null;
  }

  try {
    const querySnapshot = await getDocs(query(collection(db, collectionName), where('__name__', '==', documentId)));
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return null;
  }
};

/**
 * Function to count documents in a collection
 */
export const countDocuments = async (
  collectionName: string
): Promise<number> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return 0;
  }

  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.size;
  } catch (error) {
    console.error(`Error counting documents in ${collectionName}:`, error);
    return 0;
  }
};

/**
 * Function to search documents by a text field
 */
export const searchDocumentsByText = async (
  collectionName: string,
  textField: string,
  searchTerm: string
): Promise<DocumentData[]> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return [];
  }

  try {
    // Note: Full text search is not natively supported in Firestore
    // This is a basic implementation that gets all docs and filters client-side
    // For better performance with large collections, consider using Algolia or similar
    const allDocs = await getDocs(collection(db, collectionName));
    const results = allDocs.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(doc => {
        const value = doc[textField as keyof typeof doc];
        return value && typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase());
      });

    return results;
  } catch (error) {
    console.error(`Error searching documents in ${collectionName}:`, error);
    return [];
  }
};

/**
 * Function to get documents with pagination
 */
export const getDocumentsPaginated = async (
  collectionName: string,
  limitCount: number,
  lastDoc?: any
): Promise<{ docs: DocumentData[], lastVisible: any }> => {
  if (!isClient) {
    console.warn('Firebase utilities are not available on the server side');
    return { docs: [], lastVisible: undefined };
  }

  try {
    let q = query(
      collection(db, collectionName),
      orderBy('created_at', 'desc')
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc), limit(limitCount));
    } else {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { docs, lastVisible };
  } catch (error) {
    console.error(`Error getting paginated documents from ${collectionName}:`, error);
    return { docs: [], lastVisible: undefined };
  }
};

// Note: Import startAfter and limit from firebase/firestore when using the pagination function
// import { startAfter, limit } from 'firebase/firestore';