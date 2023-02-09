import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-menu-list',
  /* standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterLink,
    MatIconModule,
    MatListModule,
  ], */
  templateUrl: './menu-list.component.html',
  styles: [
    `
      .navigation-list-label {
        display: inline-block;
        padding-left: 6px;
      }
    `,
  ],
})
export class MenuListComponent {
  @Input() isAuthorized!: boolean | null;

  @Output() menuToggle: EventEmitter<void>;
  @Output() signOut: EventEmitter<void>;

  constructor() {
    this.menuToggle = new EventEmitter();
    this.signOut = new EventEmitter();
  }

  public closeMenu(): void {
    this.menuToggle.emit();
  }

  public onSignOut(): void {
    this.signOut.emit();
  }
}
