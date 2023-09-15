import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import {
  FirebaseApp,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app'
import { Auth, getAuth, provideAuth } from '@angular/fire/auth'
import {
  Firestore,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore'
import {
  FirebaseStorage,
  getStorage,
  provideStorage,
} from '@angular/fire/storage'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { environment } from 'src/environments/environment'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(
        (): FirebaseApp => initializeApp(environment.firebase.config)
      ),
      provideFirestore((): Firestore => getFirestore()),
      provideStorage((): FirebaseStorage => getStorage()),
      provideAuth((): Auth => getAuth())
    ),
    provideRouter(routes),
    provideAnimations(),
  ],
};
