import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <section class="flex-container">
      <div class="row">
        <mat-card>
          <mat-card-title>Pagina No Encontrada</mat-card-title>
          <mat-card-subtitle>La url que indicaste no existe</mat-card-subtitle>
          <mat-card-content>
            <p>Por favor selecciona otra ruta url</p>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      .flex-container {
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .row {
        width: auto;
      }

      mat-card {
        max-width: 900px;
        min-width: 400px;
        text-align: center;
        margin-top: 20px;
      }
    `,
  ],
})
export class NotFoundComponent {}
