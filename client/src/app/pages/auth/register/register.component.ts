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
import {
  getLoading,
  signUpEmailAction,
  UserCreateRequest
} from '@app/store/user'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {
  public loading$!: Observable<boolean | null>;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.loading$ = this._store.pipe(select(getLoading));
  }

  public registerUser(form: NgForm): void {
    if (form.valid) {
      const { name, lastName, phone, username, email, password } = form.value;
      const userCreateRequest: UserCreateRequest = {
        name,
        lastName,
        phone,
        username,
        email,
        password,
      };

      this._store.dispatch(signUpEmailAction({ user: userCreateRequest }));
    }
  }
}
