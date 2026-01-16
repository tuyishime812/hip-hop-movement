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
// Firebase utilities are not currently used - using Supabase instead
// Commenting out Firebase imports since they're not needed
// import { db } from './firebase';

// Check if running on client side before using Firebase
const isClient = typeof window !== 'undefined';

/**
 * Generic function to get documents from a collection with optional query constraints
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const getCollectionWithConstraints = async (
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<DocumentData[]> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return [];
};

/**
 * Function to check if a document exists in a collection
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const documentExists = async (
  collectionName: string,
  documentId: string
): Promise<boolean> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return false;
};

/**
 * Function to increment a numeric field in a document
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const incrementField = async (
  collectionName: string,
  documentId: string,
  fieldName: string,
  incrementValue: number = 1
): Promise<boolean> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return false;
};

/**
 * Function to add a new document and return the ID
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const addDocumentWithId = async (
  collectionName: string,
  data: Record<string, any>
): Promise<string | null> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return null;
};

/**
 * Function to update a document with timestamp
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const updateDocumentWithTimestamp = async (
  collectionName: string,
  documentId: string,
  data: Record<string, any>
): Promise<boolean> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return false;
};

/**
 * Function to batch delete documents based on a condition
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const batchDeleteDocuments = async (
  collectionName: string,
  field: string,
  operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any',
  value: any
): Promise<number> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return 0;
};

/**
 * Function to get a document by ID
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const getDocumentById = async (
  collectionName: string,
  documentId: string
): Promise<DocumentData | null> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return null;
};

/**
 * Function to count documents in a collection
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const countDocuments = async (
  collectionName: string
): Promise<number> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return 0;
};

/**
 * Function to search documents by a text field
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const searchDocumentsByText = async (
  collectionName: string,
  textField: string,
  searchTerm: string
): Promise<DocumentData[]> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return [];
};

/**
 * Function to get documents with pagination
 * NOTE: This function is not currently implemented as the app uses Supabase instead of Firebase
 */
export const getDocumentsPaginated = async (
  collectionName: string,
  limitCount: number,
  lastDoc?: any
): Promise<{ docs: DocumentData[], lastVisible: any }> => {
  console.warn('Firebase utilities are not currently used - using Supabase instead');
  return { docs: [], lastVisible: undefined };
};

// Note: Import startAfter and limit from firebase/firestore when using the pagination function
// import { startAfter, limit } from 'firebase/firestore';