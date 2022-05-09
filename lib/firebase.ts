import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  collection,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  getFirestore,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

function createFirebaseApp(config: any) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const app = createFirebaseApp(firebaseConfig);

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

const analyticsFunction = async () => {
  try {
    if (await isSupported()) {
      return getAnalytics(app);
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
const analytics = analyticsFunction();

export default app;
export { db, auth, analytics };

// helper functions
export async function getUserWithUsername(username: string | string[]) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

export function listToJSON(doc: DocumentData) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

interface LinkPreview {
  url: string;
  title: string;
  siteName: string;
  description: string;
  mediaType: string;
  contentType: string;
  images: Array<String>;
  videos: Array<String>;
  favicons: Array<String>;
  linkID: string;
}

export function linksToJSON(docs: DocumentData): LinkPreview {
  const data = docs.data();
  return {
    ...data,
  };
}

interface FirestoreUser extends DocumentSnapshot<DocumentData> {
  username: string;
  photoURL: string;
  displayName: string;
  dateCreated?: Timestamp;
  authID: string;
  email: string;
  description: string | null;
  followers?: number;
  Top5Lists?: string[];
}

declare global {
  interface FirestoreUser {
    username: string;
    photoURL: string;
    displayName: string;
    dateCreated?: Timestamp;
    authID: string;
    email: string;
    description: string | null;
    followers?: number;
    Top5Lists?: string[];
  }
}

export function userInfoToJSON(docs: DocumentData): FirestoreUser {
  const data = docs.data();
  return {
    ...data,
  };
}
