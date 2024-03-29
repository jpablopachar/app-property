import { CommonModule } from '@angular/common'
import { Component, Input, inject } from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'

@Component({
  selector: 'app-entity-photo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photo" [style.backgroundImage]="safePhotoURL"></div>
  `,
  styles: [
    `
      @import 'styles/colors.scss';

      .photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: $secondary;
        background-size: cover;
      }
    `,
  ],
})
export class EntityPhotoComponent {
  @Input() photoURL!: string;

  private _sanitizer: DomSanitizer;

  constructor() {
    this._sanitizer = inject(DomSanitizer);
  }

  public get safePhotoURL(): SafeStyle | null {
    return this.photoURL
      ? this._sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`)
      : null;
  }
}
