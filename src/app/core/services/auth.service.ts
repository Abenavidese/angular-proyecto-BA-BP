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
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

export interface Credential {
  email: string;
  password: string;
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

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password);
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
    await setDoc(userDoc, { role, ...additionalData });
  }
}
