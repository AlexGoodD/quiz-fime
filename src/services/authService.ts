import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  googleProvider, db
} from '../firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function login(email: string, password: string): Promise<void> {
  if (!email || !password) {
    alert('Por favor, rellena todos los campos.');
    throw new Error('Por favor, rellena todos los campos.');
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.setItem('isAdmin', 'false');
      }
    }
  } catch (error) {
    alert('Error en datos de inicio de sesión.');
    throw error;
  }
}

export async function register(email: string, password: string): Promise<void> {
  if (!email || !password) {
    alert('Por favor, rellena todos los campos.');
    throw new Error('Por favor, rellena todos los campos.');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      isAdmin: false,
      registerMethod: 'email',
      timestamp: new Date().toISOString()
    });
    alert('Registro exitoso. Por favor, inicia sesión.');
  } catch (error) {
    alert('Error en el registro.');
    throw error;
  }
}

export async function loginWithGoogle(): Promise<void> {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        isAdmin: false,
        registerMethod: 'google',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Google login failed:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}


export async function checkAdminStatus(): Promise<boolean> {
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const isAdmin = userData.isAdmin || false;

      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
      return isAdmin;
    }
  }

  return false;
}