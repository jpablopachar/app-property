import { AsyncPipe, NgFor, NgIf } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Property } from '@app/models/server'
import { SpinnerComponent } from '@app/shared'
// import { selectGetLoading } from '@app/store/user'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { PropertyState, readAction, selectGetProperties, selectLoading } from '../../store/property'
// import { readAction, selectGetProperties } from '../../store/property'

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    SpinnerComponent,
    MatCardModule,
    MatButtonModule,
  ],
  template: `
    <app-spinner *ngIf="loading$ | async"></app-spinner>
    <section class="container">
      <ul class="cards" *ngIf="properties$ | async as properties">
        <li class="cards__item" *ngFor="let property of properties">
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>{{ property.name }}</mat-card-title>
              <mat-card-subtitle>Precio {{ property.price }}</mat-card-subtitle>
            </mat-card-header>
            <img
              mat-card-image
              src="{{ property.picture ? property.picture : defaultPicture }}"
              alt="{{ property.name }}"
            />
            <mat-card-content>
              <p>
                {{ property.address }}
              </p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button>Ver</button>
              <button mat-button>Comprar</button>
            </mat-card-actions>
          </mat-card>
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .container {
        display: flex;
        &__content {
          min-height: 150px;
        }
      }

      .card-item {
        padding: 3px 3px 3px 3px;
      }

      .cards {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .cards__item {
        display: flex;
        padding: 1rem;
      }

      .example-card {
        max-width: 400px;
      }
    `,
  ],
})
export class PropertyListComponent implements OnInit {
  private _store: Store<PropertyState>;

  public defaultPicture: string;

  public properties$!: Observable<Property[] | null>;
  public loading$!: Observable<boolean | null>;

  constructor() {
    this._store = inject(Store);

    this.defaultPicture =
      'https://firebasestorage.googleapis.com/v0/b/edificacion-app.appspot.com/o/image%2F1637099019171_O5986058_0.jpg?alt=media&token=0a146233-d63b-4702-b28d-6eaddf5e207a';
  }

  ngOnInit(): void {
    this.loading$ = this._store.pipe(select(selectLoading));
    this.properties$ = this._store.pipe(select(selectGetProperties));

    this._store.dispatch(readAction());
  }
}
