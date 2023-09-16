import { CommonModule } from '@angular/common'
import { Component, WritableSignal, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterOutlet } from '@angular/router'
import { NotificationService } from './services'
import { FilesUploadModule, SpinnerComponent } from './shared'

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
  ],
  template: ` <mat-sidenav-container>
    <mat-sidenav #menu><p>Elemento Sidenav</p></mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="menu.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Edificaciones Store</span>
      </mat-toolbar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </mat-sidenav-content>
  </mat-sidenav-container>`,
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
export class AppComponent {
  private _notificationService: NotificationService;

  public showSpinner: WritableSignal<boolean>;

  constructor() {
    this._notificationService = inject(NotificationService);

    this.showSpinner = signal(false);
  }

  public onToggleSpinner(): void {
    this.showSpinner.set(!this.showSpinner());
  }

  public onFilesChanged(urls: string | string[]): void {
    console.log(urls);
  }

  public onSuccess(): void {
    this._notificationService.success('El procedimiento fué exitoso');
  }

  public onError(): void {
    this._notificationService.error('Se encontraron errores en el proceso');
  }
}
