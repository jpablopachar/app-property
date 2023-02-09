import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, NgForm } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { SpinnerComponent } from '@app/shared'
import * as fromRoot from '@app/store'
import { EmailPasswordCredentials, getLoading, signInEmailAction } from '@app/store/user'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    SpinnerComponent,
  ],
  template: `
    <app-spinner *ngIf="loading$ | async"></app-spinner>
    <section fxLayoutAlign="center">
      <mat-card>
        <form
          fxLayout="column"
          fxLayoutAlign="center center"
          fxLayoutGap="10px"
          #f="ngForm"
          (ngSubmit)="loginUser(f)"
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
    `,
  ],
})
export class LoginComponent implements OnInit {
  public loading$!: Observable<boolean | null>;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.loading$ = this._store.pipe(select(getLoading));
  }

  public loginUser(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;
      const userLoginRequest: EmailPasswordCredentials = { email, password };

      this._store.dispatch(
        signInEmailAction({ credentials: userLoginRequest })
      );
    }
  }
}
