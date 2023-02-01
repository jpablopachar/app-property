import { importProvidersFrom } from '@angular/core'
import {
  FirebaseApp,
  initializeApp,
  provideFirebaseApp
} from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import {
  Firestore,
  getFirestore,
  provideFirestore
} from '@angular/fire/firestore'
import {
  FirebaseStorage,
  getStorage,
  provideStorage
} from '@angular/fire/storage'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AppComponent } from '@app/app.component'
import { environment } from 'environments/environment'

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(
        (): FirebaseApp => initializeApp(environment.firebase)
      ),
      provideAuth(() => getAuth()),
      provideFirestore((): Firestore => getFirestore()),
      provideStorage((): FirebaseStorage => getStorage())
    ),
  ],
});
