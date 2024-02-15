import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase.config';
import {} from '@firebase/auth-types';
import { user } from '../interfaces/user.interface';

class AuthService {
  observeAuthChanges(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(callback);
  }

  async signInWithGoogle(): Promise<user | null> {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        displayName: result.user.displayName!,
        email: result.user.email!,
        photoURL: result.user.photoURL!,
        uid: result.user.uid!,
      };
  }
  async signOut(): Promise<void> {
      await auth.signOut();
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    username: string,
  ): Promise<void> {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: username,
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/piratest-cheaf.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=81f58597-20b9-44c3-a26a-6e9118081abd',
      });
  }
  async _signInWithEmailAndPassword(email: string, password: string): Promise<user | null> {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return {
        displayName: result.user.displayName!,
        email: result.user.email!,
        photoURL: result.user.photoURL!,
        uid: result.user.uid!,
      };
  }
}

export default new AuthService();
