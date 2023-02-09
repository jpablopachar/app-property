import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '@app/models/backend'

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="onMenuToggleDispatch()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Edificaciones Store</span>
      <div fxFlex fxLayout="row" fxLayoutAlign="flex-end" fxHide.xs>
        <ul fxLayout="row" fxLayoutGap="10px" class="navigation-menu">
          <li>
            <a>{{ user ? user.name + ' ' + user.lastName : null }}</a>
          </li>
          <li>
            <a *ngIf="!isAuthorized" routerLink="auth/register">
              Registrar
            </a>
          </li>
          <li><a *ngIf="!isAuthorized" routerLink="auth/login"> Login </a></li>
          <li><a *ngIf="isAuthorized" routerLink="/"> Home </a></li>
          <li (click)="onSignOut()">
            <a *ngIf="isAuthorized" routerLink="/"> Salir </a>
          </li>
        </ul>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .navigation-menu {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      a {
        text-decoration: none;
        color: white;
        cursor: pointer;
      }

      a:hover,
      a:active {
        color: #dbcde6;
      }
    `,
  ],
})
export class HeaderComponent {
  @Input() user!: User | null;
  @Input() isAuthorized!: boolean | null;

  @Output() menuToggle: EventEmitter<void>;
  @Output() signOut: EventEmitter<void>;

  constructor() {
    this.menuToggle = new EventEmitter();
    this.signOut = new EventEmitter();
  }

  public onMenuToggleDispatch(): void {
    this.menuToggle.emit();
  }

  public onSignOut(): void {
    this.signOut.emit();
  }
}
