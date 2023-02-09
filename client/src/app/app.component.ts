import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { NotificationService } from './services'
import * as fromRoot from './store'
import { getIsAuthorized, getUser, initAction, signOutEmailAction } from './store/user'

@Component({
  selector: 'app-root',
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
  ]
})
export class AppComponent implements OnInit {
  private _showSpinner: boolean;

  public user$!: Observable<any>;
  public isAuthorized$!: Observable<any>;

  constructor(
    private readonly _router: Router,
    private readonly _store: Store<fromRoot.State>,
    private readonly _notificationService: NotificationService
  ) {
    this._showSpinner = false;
  }

  public ngOnInit(): void {
    this.user$ = this._store.select(getUser);
    this.isAuthorized$ = this._store.select(getIsAuthorized);

    this._store.dispatch(initAction());
  }

  public onToggleSpinner(): void {
    this._showSpinner = !this._showSpinner;
  }

  public onFilesChanged(urls: string | string[]): void {
    console.log(urls);
  }

  public onSuccess(): void {
    this._notificationService.success("El procedimiento fue exitoso");
  }

  public onError(): void {
    this._notificationService.error("Se encontraron errores en el proceso");
  }

  public onSignOut(): void {
    localStorage.removeItem('token');
    this._store.dispatch(signOutEmailAction());
    this._router.navigate(['/auth/login']);
  }
}
