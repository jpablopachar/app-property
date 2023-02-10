import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Property } from '@app/models/backend'
import { SpinnerComponent } from '@app/shared'
import * as fromRoot from '@app/store'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
// import * as fromProperty from '../../store/property'
import {
  getLoading, getProperties, readPropertyAction
} from '../../store/property'

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, SpinnerComponent],
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
              src="{{ property.picture ? property.picture : pictureDefault }}"
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

      mat-card img {
        object-fit: cover;
        width: 400px;
        height: 60%;
      }
    `,
  ],
})
export class PropertyListComponent implements OnInit {
  properties$!: Observable<Property[] | null>;
  loading$!: Observable<boolean | null>;

  pictureDefault: string;

  constructor(
    private readonly _store: Store<fromRoot.State>
  ) {
    this.pictureDefault =
      'https://firebasestorage.googleapis.com/v0/b/edificacion-app.appspot.com/o/image%2F1637099019171_O5986058_0.jpg?alt=media&token=0a146233-d63b-4702-b28d-6eaddf5e207a';
  }

  ngOnInit(): void {
    this.loading$ = this._store.select(getLoading);
    this.properties$ = this._store.select(getProperties);

    this._store.dispatch(readPropertyAction());
  }
}
