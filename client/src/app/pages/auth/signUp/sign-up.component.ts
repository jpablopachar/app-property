import { AsyncPipe, NgIf } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { SpinnerComponent } from '@app/shared'
import {
  UserCreateRequest,
  UserState,
  selectGetLoading,
  signUpEmailAction,
} from '@app/store/user'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule,
    MatCardModule,
    SpinnerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styles: [
    `
      section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 94vh;
      }

      .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      mat-form-field {
        width: 300px;
      }

      mat-card {
        width: 350px;
        text-align: center;
        margin-top: 20px;
      }
    `,
  ],
})
export class SignUpComponent implements OnInit {
  private _store: Store<UserState>;

  public loading$!: Observable<boolean | null>;

  constructor() {
    this._store = inject(Store);
  }

  ngOnInit(): void {
    this.loading$ = this._store.pipe(select(selectGetLoading));
  }

  public register(form: NgForm): void {
    if (form.valid) {
      const { name, lastName, phone, username, email, password } = form.value;

      const user: UserCreateRequest = {
        name,
        lastName,
        phone,
        username,
        email,
        password,
      };

      this._store.dispatch(signUpEmailAction({ user }));
    }
  }
}
