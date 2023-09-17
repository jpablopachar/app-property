import { NgIf } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { User } from '@app/models/server'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="onMenuToggleDispatch()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Edificaciones Store</span>
      <div class="container">
        <ul class="navegacion-menu">
          <li>
            <a>{{ user ? user.name + ' ' + user.lastName : null }}</a>
          </li>
          <li>
            <a *ngIf="!isAuthorized" routerLink="auth/registration">
              Registrar
            </a>
          </li>
          <li><a *ngIf="!isAuthorized" routerLink="auth/login">Login</a></li>
          <li><a *ngIf="isAuthorized" routerLink="/">Home</a></li>
          <li (click)="onSignOut()">
            <a *ngIf="isAuthorized" routerLink="/">Salir</a>
          </li>
        </ul>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      .navegacion-menu {
        display: flex;
        flex-direction: row;
        gap: 10px;
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

      @media (max-width: 599px) {
        .container {
          display: none;
        }
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
