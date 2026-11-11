import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isAuthConfigured, loadAuthSdk } from '../firebase';

const AuthContext = createContext(null);

const MESSAGES = {
  'auth/invalid-credential': 'That email and password do not match.',
  'auth/wrong-password': 'That email and password do not match.',
  'auth/user-not-found': 'That email and password do not match.',
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in.',
  'auth/weak-password': 'Please use a password of at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'We could not reach the server. Check your connection and try again.',
  'auth/popup-closed-by-user': 'Google sign-in was closed before it finished.',
  'auth/popup-blocked': 'Your browser blocked the Google sign-in window. Please allow pop-ups and try again.',
};

const friendly = (error) => new Error(MESSAGES[error.code] || 'Something went wrong. Please try again.');

async function requireSdk() {
  const sdk = await loadAuthSdk();
  if (!sdk) throw new Error('Sign-in is not available yet. Please contact us to place your order.');
  return sdk;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isAuthConfigured);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;
    loadAuthSdk().then((sdk) => {
      if (!sdk || cancelled) return;
      unsubscribe = sdk.onAuthStateChanged(sdk.auth, (next) => {
        setUser(next);
        setLoading(false);
      });
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthConfigured,
      // "Remember me" keeps the session after the browser closes; otherwise it lasts for this tab session.
      async signIn(email, password, remember = true) {
        const sdk = await requireSdk();
        try {
          await sdk.setPersistence(sdk.auth, remember ? sdk.browserLocalPersistence : sdk.browserSessionPersistence);
          await sdk.signInWithEmailAndPassword(sdk.auth, email, password);
        } catch (error) {
          throw friendly(error);
        }
      },
      async signInWithGoogle(remember = true) {
        const sdk = await requireSdk();
        try {
          await sdk.setPersistence(sdk.auth, remember ? sdk.browserLocalPersistence : sdk.browserSessionPersistence);
          await sdk.signInWithPopup(sdk.auth, new sdk.GoogleAuthProvider());
        } catch (error) {
          throw friendly(error);
        }
      },
      async resetPassword(email) {
        const sdk = await requireSdk();
        try {
          await sdk.sendPasswordResetEmail(sdk.auth, email);
        } catch (error) {
          throw friendly(error);
        }
      },
      async register(name, email, password) {
        const sdk = await requireSdk();
        try {
          const result = await sdk.createUserWithEmailAndPassword(sdk.auth, email, password);
          await sdk.updateProfile(result.user, { displayName: name });
          await sdk.sendEmailVerification(result.user);
        } catch (error) {
          throw friendly(error);
        }
      },
      async signOut() {
        const sdk = await requireSdk();
        await sdk.signOut(sdk.auth);
      },
      getToken: () => user?.getIdToken() ?? Promise.resolve(null),
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
