import { AsyncPipe, NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SpinnerComponent } from '@app/shared'
import {
  EmailPasswordCredentials,
  UserState,
  signInEmailAction,
} from '@app/store/user'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule,
    SpinnerComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <app-spinner *ngIf="loading$ | async"></app-spinner>
    <section>
      <mat-card>
        <form
          class="login-form"
          #signInForm="ngForm"
          (ngSubmit)="login(signInForm)"
        >
          <mat-form-field>
            <mat-label>Ingrese E-Mail</mat-label>
            <input
              type="email"
              matInput
              placeholder="E-Mail"
              name="email"
              ngModel
              required
            />
            <mat-error>Debe ingresar un E-Mail</mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Ingrese Password</mat-label>
            <input
              type="password"
              matInput
              placeholder="Password"
              name="password"
              ngModel
              required
            />
            <mat-error>Debe ingresar un password</mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">
            Enviar
          </button>
        </form>
      </mat-card>
    </section>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }

      mat-card {
        width: 300px;
        text-align: center;
        margin-top: 20px;
      }

      section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 94vh;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    `,
  ],
})
export class SignInComponent {
  private _store!: Store<UserState>;
  public loading$!: Observable<boolean | null>;

  constructor() {
    this._store = inject(Store);
  }

  public login(form: NgForm): void {
    const credentials: EmailPasswordCredentials = {
      email: form.value.email,
      password: form.value.password,
    };

    this._store.dispatch(signInEmailAction({ credentials }));
  }
}
