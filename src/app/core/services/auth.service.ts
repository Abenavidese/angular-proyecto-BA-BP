import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Credential {
  email: string;
  password: string;
}

export interface UserData {
  role: 'admin' | 'visitor'; // Definición de los roles posibles
  // Otras propiedades si las hubiera
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  readonly authState$ = authState(this.auth);

  async signUpWithEmailAndPassword(credential: Credential, role: 'visitor' | 'admin', additionalData: any): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, credential.email, credential.password);
    await this.setUserRole(userCredential.user.uid, role, additionalData);
    return userCredential;
  }

  async logInWithEmailAndPassword(credential: Credential): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, credential.email, credential.password);
      const userId = userCredential.user.uid;
      const userDoc = await getDoc(doc(this.firestore, `users/${userId}`));
      if (userDoc.exists()) {
        const userData: UserData = userDoc.data() as UserData;
        const userRole = userData.role; // Acceso a la propiedad 'role'
        if (userRole === 'admin') {
          // Usuario es administrador
          // Realiza acciones específicas para administradores
        } else if (userRole === 'visitor') {
          // Usuario es visitante
          // Realiza acciones específicas para visitantes
        }
      } else {
        console.error('No se encontró información del usuario.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  // providers
  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();
    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error: any) {
      return error;
    }
  }

  private async setUserRole(userId: string, role: 'visitor' | 'admin', additionalData: any): Promise<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    await setDoc(userDoc, { role: role.toString(), ...additionalData });
  }

  getUserRole(userId: string): Observable<string | null> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDoc)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data() as UserData;
          return userData.role;
        } else {
          return null;
        }
      })
    );
  }
}