import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { HeaderComponent, MenuListComponent } from './components'
import { User } from './models/server'
import { FilesUploadModule, SpinnerComponent } from './shared'
import {
  UserState,
  initAction,
  selectGetIsAuthorized,
  selectGetUser,
  signOutEmailAction,
} from './store/user'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SpinnerComponent,
    FilesUploadModule,
    MenuListComponent,
    HeaderComponent,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #menu>
        <app-menu-list
          (menuToggle)="menu.toggle()"
          (signOut)="onSignOut()"
          [isAuthorized]="isAuthorized()"
        ></app-menu-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header
          (menuToggle)="menu.toggle()"
          [isAuthorized]="isAuthorized()"
          [user]="user()"
          (signOut)="onSignOut()"
        ></app-header>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container,
      mat-sidenav-content,
      mat-sidenav,
      mat-nav-list {
        height: 100%;
      }
      mat-sidenav {
        width: 250px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private _store: Store<UserState>;
  private _router: Router;

  public showSpinner: WritableSignal<boolean>;

  public user!: Signal<User | null>;
  public isAuthorized!: Signal<boolean>;

  constructor() {
    this._store = inject(Store);
    this._router = inject(Router);

    this.showSpinner = signal(false);
  }

  public ngOnInit(): void {
    this.user = this._store.selectSignal(selectGetUser);
    this.isAuthorized = this._store.selectSignal(selectGetIsAuthorized);

    this._store.dispatch(initAction());
  }

  public onSignOut(): void {
    localStorage.removeItem('token');

    this._store.dispatch(signOutEmailAction());

    this._router.navigate(['/auth/login']);
  }
}
