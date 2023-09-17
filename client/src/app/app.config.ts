import { HttpClientModule } from '@angular/common/http'
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core'
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
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { routes } from './app.routes'
import { NotificationModule } from './services'
import { AuthModule } from './services/auth/auth.module'
import { userEffects } from './store'
import { userReducers } from './store/user'

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      NotificationModule.forRoot(),
      AuthModule.forRoot(),
      provideFirebaseApp(
        (): FirebaseApp => initializeApp(environment.firebase.config)
      ),
      provideFirestore((): Firestore => getFirestore()),
      provideStorage((): FirebaseStorage => getStorage()),
      provideAuth((): Auth => getAuth())
    ),
    provideRouter(routes),
    provideAnimations(),
    provideStore({ user: userReducers }),
    provideEffects(userEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
