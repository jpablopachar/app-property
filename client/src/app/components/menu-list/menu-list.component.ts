import { NgIf } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [NgIf, RouterLink, MatListModule, MatIconModule],
  templateUrl: './menu-list.component.html',
  styles: [
    `
      .navegacion-list-label {
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

  onSignOut(): void {
    this.signOut.emit();
  }
}
