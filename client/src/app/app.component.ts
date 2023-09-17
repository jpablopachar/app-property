import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterOutlet } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { HeaderComponent, MenuListComponent } from './components'
import { User } from './models/server'
import { NotificationService } from './services'
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
          [isAuthorized]="isAuthorized$ | async"
        ></app-menu-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header
          (menuToggle)="menu.toggle()"
          [isAuthorized]="isAuthorized$ | async"
          [user]="user$ | async"
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
  private _notificationService: NotificationService;
  private _store: Store<UserState>;
  private _router: Router;

  public showSpinner: WritableSignal<boolean>;
  public user$!: Observable<User>;
  public isAuthorized$!: Observable<boolean>;

  constructor() {
    this._store = inject(Store);
    this._notificationService = inject(NotificationService);
    this._router = inject(Router);

    this.showSpinner = signal(false);
  }

  public ngOnInit(): void {
    this.user$ = this._store.pipe(select(selectGetUser)) as Observable<User>;

    this.isAuthorized$ = this._store.pipe(
      select(selectGetIsAuthorized)
    ) as Observable<boolean>;

    this._store.dispatch(initAction());
  }

  public onSignOut(): void {
    localStorage.removeItem('token');

    this._store.dispatch(signOutEmailAction());

    this._router.navigate(['/auth/login']);
  }
}
