import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, NgForm } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { EntityPhotoComponent, PopupsModule, SpinnerComponent } from '@app/shared'
import * as fromRoot from '@app/store'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  createPropertyAction,
  getLoading,
  PropertyCreateRequest
} from '../../store/property'

@Component({
  selector: 'app-property-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SpinnerComponent,
    EntityPhotoComponent,
    PopupsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  templateUrl: './property-new.component.html',
  styles: [
    `
      @import 'styles/colors';

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
  public loading$!: Observable<boolean | null>;
  public photoLoaded!: string;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  public registerProperty(form: NgForm): void {
    if (form.valid) {
      this.loading$ = this._store.select(getLoading);

      const { name, address, price } = form.value;

      const property: PropertyCreateRequest = {
        name,
        address,
        picture: this.photoLoaded,
        price: Number(price),
      };

      this._store.dispatch(createPropertyAction({ property }));
    }
  }

  public onFilesChanged(url: any): void {
    if (url) this.photoLoaded = url;
  }
}
