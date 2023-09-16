import { CommonModule } from '@angular/common'
import { Component, WritableSignal, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NotificationService } from './services'
import { FilesUploadModule, SpinnerComponent } from './shared'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SpinnerComponent, FilesUploadModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
