import { AsyncPipe, NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { EntityPhotoComponent, SpinnerComponent } from '@app/shared'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  PropertyCreateRequest,
  PropertyState,
  createsAction,
  selectLoading,
} from '../../store/property'

@Component({
  selector: 'app-property-new',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    SpinnerComponent,
    EntityPhotoComponent,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './property-new.component.html',
  styles: [
    `
      @import 'styles/colors.scss';

      section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 94vh;
      }

      .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      mat-card {
        width: 450px;
        text-align: center;
        margin-top: 20px;
      }

      mat-form-field {
        width: 400px;
      }

      .personal {
        &__photo {
          display: flex;
          justify-content: center;
        }
      }

      .photo {
        display: inline-flex;
        align-items: center;
        align-content: center;
        padding-bottom: 20px;
        flex-direction: column;
        border-radius: 0%;
        width: 150px;
        height: 150px;
        &__img {
          margin-bottom: 16px;
        }
      }
    `,
  ],
})
export class PropertyNewComponent {
  private _store: Store<PropertyState>;

  public loading$!: Observable<boolean | null>;
  public photoLoaded!: string;

  constructor() {
    this._store = inject(Store);
  }

  public register(form: NgForm): void {
    if (form.valid) {
      const { name, price, address } = form.value;
      this.loading$ = this._store.pipe(select(selectLoading));

      const property: PropertyCreateRequest = {
        name,
        picture: this.photoLoaded || '',
        price,
        address,
      };

      this._store.dispatch(createsAction({ property }));
    }
  }

  public onFilesChanged(url: any): void {
    if (url) this.photoLoaded = url;
  }
}
