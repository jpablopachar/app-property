import { CommonModule } from '@angular/common'
import { Component, WritableSignal, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FilesUploadDirective, SpinnerComponent } from './shared'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SpinnerComponent, FilesUploadDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public showSpinner: WritableSignal<boolean> = signal(false);

  public onToggleSpinner(): void {
    this.showSpinner.set(!this.showSpinner());
  }

  public onFilesChanged(urls: string | string[]): void {
    console.log(urls);
  }
}
