// Firebase Auth loads only when real web keys are set in frontend/.env:
//   VITE_FIREBASE_API_KEY=...
//   VITE_FIREBASE_APP_ID=...
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

export const isAuthConfigured = Boolean(apiKey && appId);

let sdk;

export function loadAuthSdk() {
  if (!isAuthConfigured) return Promise.resolve(null);
  sdk ??= Promise.all([import('firebase/app'), import('firebase/auth')]).then(([app, auth]) => ({
    ...auth,
    auth: auth.getAuth(
      app.initializeApp({
        apiKey,
        appId,
        projectId: 'idealpack-store',
        authDomain: 'idealpack-store.firebaseapp.com',
      }),
    ),
  }));
  return sdk;
}
