/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

async function getFirebaseApp() {
  if (getApps().length > 0) return getApp();
  
  try {
    // Vite dynamic import with ignore to handle potentially missing file at build time
    // @ts-ignore
    const config = await import(/* @vite-ignore */ '../../firebase-applet-config.json');
    return initializeApp(config.default || config);
  } catch (e) {
    console.error("Firebase configuration missing. Please complete setup in AI Studio.");
    throw new Error("FIREBASE_MISSING");
  }
}

export async function getDb(): Promise<Firestore> {
  if (!db) {
    const app = await getFirebaseApp();
    db = getFirestore(app);
  }
  return db;
}

export async function getFirebaseAuth(): Promise<Auth> {
  if (!auth) {
    const app = await getFirebaseApp();
    auth = getAuth(app);
  }
  return auth;
}
