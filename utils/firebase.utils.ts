// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Singleton for analytics
let analyticsInstance: Analytics | null = null;
let analyticsInitPromise: Promise<Analytics | null> | null = null;

const initAnalytics = (): Promise<Analytics | null> => {
  if (analyticsInstance !== null) return Promise.resolve(analyticsInstance);
  if (analyticsInitPromise) return analyticsInitPromise;

  analyticsInitPromise = (async () => {
    if (typeof window === "undefined") return null;
    const supported = await isSupported();
    if (!supported) return null;

    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
  })();

  return analyticsInitPromise;
};

export { app, initAnalytics };
