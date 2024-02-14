// src/services/AuthService.ts
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
  // Observador para escuchar cambios en la autenticación
  observeAuthChanges(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(callback);
  }

  // Método para iniciar sesión con Google
  async signInWithGoogle(): Promise<user | null> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        displayName: result.user.displayName!,
        email: result.user.email!,
        photoURL: result.user.photoURL!,
        uid: result.user.uid!,
      };
    } catch (error) {
      throw error;
    }
  }

  // Método para cerrar sesión
  async signOut(): Promise<void> {
    try {
      await auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  // Método para registrar un nuevo usuario con correo y contraseña
  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    username: string,
  ): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: username,
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/piratest-cheaf.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=81f58597-20b9-44c3-a26a-6e9118081abd',
      });
    } catch (error) {
      throw error;
    }
  }

  // Método para iniciar sesión con correo y contraseña
  async _signInWithEmailAndPassword(email: string, password: string): Promise<user | null> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return {
        displayName: result.user.displayName!,
        email: result.user.email!,
        photoURL: result.user.photoURL!,
        uid: result.user.uid!,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
