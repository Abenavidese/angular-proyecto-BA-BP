import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      projectId: "angualar-proyectodcu",
      appId: "1:790252507052:web:3b579707f8cf6c655cf409",
      storageBucket: "angualar-proyectodcu.appspot.com",
      apiKey: "AIzaSyB5iGj0szTIq_aVpS5z3X8iMHo5KsNL3dI",
      authDomain: "angualar-proyectodcu.firebaseapp.com",
      messagingSenderId: "790252507052"
    })), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"angualar-proyectodcu","appId":"1:790252507052:web:3b579707f8cf6c655cf409","storageBucket":"angualar-proyectodcu.appspot.com","apiKey":"AIzaSyB5iGj0szTIq_aVpS5z3X8iMHo5KsNL3dI","authDomain":"angualar-proyectodcu.firebaseapp.com","messagingSenderId":"790252507052"})), provideFirestore(() => getFirestore())
  ]
};

