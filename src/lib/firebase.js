import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkVX2bRWl0ekIzuwn1B-fGY3ZQoM3frLM",
  authDomain: "affilliatesubmittool.firebaseapp.com",
  projectId: "affilliatesubmittool",
  storageBucket: "affilliatesubmittool.appspot.com",
  messagingSenderId: "692266622477",
  appId: "1:692266622477:web:701005881b234acaedbf44",
  measurementId: "G-BBPYLPH6KX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
