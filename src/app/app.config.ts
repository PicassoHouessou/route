import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"route-b52d9","appId":"1:1077626078503:web:dc907a4199b98b198b5502","storageBucket":"route-b52d9.firebasestorage.app","apiKey":"AIzaSyBI_zlW_mOR1sUX-SiAmMPe0KctPuQXRO4","authDomain":"route-b52d9.firebaseapp.com","messagingSenderId":"1077626078503"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
};
