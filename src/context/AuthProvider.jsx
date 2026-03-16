import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import api from '../services/api';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [dbUser,  setDbUser]  = useState(null);
  const [loading, setLoading] = useState(true);

  const syncWithBackend = async (firebaseUser) => {
    try {
      const { data } = await api.post('/auth/firebase-sync', {
        name:     firebaseUser.displayName,
        email:    firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid:      firebaseUser.uid,
      });
      if (data.token) {
        localStorage.setItem('pawmart_token', data.token);
        setDbUser(data.user);
      }
    } catch {
      // backend unreachable — continue anyway
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await syncWithBackend(firebaseUser);
      } else {
        setUser(null);
        setDbUser(null);
        localStorage.removeItem('pawmart_token');
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('pawmart_token');
    setDbUser(null);
  };

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

  const isAdmin = dbUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user, dbUser, loading, isAdmin,
      register, login, loginWithGoogle,
      logout, updateUserProfile,
      setUser, syncWithBackend,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;