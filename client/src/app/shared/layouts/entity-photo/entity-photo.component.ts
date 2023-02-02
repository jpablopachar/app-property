import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'

@Component({
  selector: 'app-entity-photo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photo" [style.backgroundImage]="safePhotoURL"></div>
  `,
  styles: [`
    @import 'styles/colors';

    .photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: $secondary;
      background-size: cover;
    }
  `]
})
export class EntityPhotoComponent {
  @Input() photoUrl!: string;

  constructor(private readonly sanitizer: DomSanitizer) { }

  public get safePhotoURL(): SafeStyle | null {
    return this.photoUrl ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoUrl})`) : null;
  }
}
