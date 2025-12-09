import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { ILoginEmailPassword, IRegisterEmailPassword } from "./type";
import { auth } from "../../libs/firebase";

// GOOGLE SIGN IN
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

// REGISTER
export const registerWithEmail = async ({
  email,
  password,
  displayName,
}: IRegisterEmailPassword) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: displayName });

  return userCredential;
};

// LOGIN
export const loginWithEmail = async ({ email, password }: ILoginEmailPassword) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const logout = async () => {
  return await signOut(auth);
};

// LISTENER
export const listenToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// MAP USER
export const mapUser = (user: User | null) => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    providerId: user.providerData[0]?.providerId ?? "unknown",
  };
};
