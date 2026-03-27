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
      const currentUser = firebaseUser || auth.currentUser;
      if (!currentUser) return null;
      
      const { data } = await api.post('/auth/firebase-sync', {
        name:     currentUser.displayName || '',
        email:    currentUser.email,
        photoURL: currentUser.photoURL || '',
        uid:      currentUser.uid,
      });
      if (data.token) {
        localStorage.setItem('pawmart_token', data.token);
        setDbUser(data.user);
      }
      return data;
    } catch (error) {
      console.error('Sync with backend error:', error);
      return null;
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
    setUser(null);
  };

  const updateUserProfile = async (name, photoURL) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user logged in');
      }
      
      // Try to update Firebase profile, but don't fail if photoURL is too long
      try {
        await updateProfile(auth.currentUser, { 
          displayName: name, 
          photoURL: photoURL 
        });
        console.log('Firebase profile updated successfully');
      } catch (firebaseError) {
        // If photoURL is too long, try updating without photoURL
        if (firebaseError.code === 'auth/invalid-profile-attribute') {
          console.log('Photo URL too long, updating without photoURL');
          await updateProfile(auth.currentUser, { 
            displayName: name
          });
        } else {
          throw firebaseError;
        }
      }
      
      // Update local user state
      setUser(prev => ({
        ...prev,
        displayName: name,
        photoURL: photoURL
      }));
      
      return { success: true };
    } catch (error) {
      console.error('Firebase profile update error:', error);
      throw error;
    }
  };

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