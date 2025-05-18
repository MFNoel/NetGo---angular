import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() =>
    initializeApp({
      apiKey: "AIzaSyDB9ej8Uo6p8lUdhoV-Wvj9ndq6_m4vEVU",
      authDomain: "netgo2.firebaseapp.com",
      projectId: "netgo2",
      storageBucket: "netgo2.firebasestorage.app",
      messagingSenderId: "709008123021",
      appId: "1:709008123021:web:132d64413258bcabb0eec4"
    })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  ]
};