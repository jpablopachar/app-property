import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <section class="flex-container">
      <div class="row">
        <mat-card>
          <mat-card-title>Bienvenido al Curso de Angular</mat-card-title>
          <mat-card-subtitle>Desarrollo Profesional de Apps</mat-card-subtitle>
          <mat-card-content>
            <p>
              Este curso se orienta a crear Apps con tecnologías de Backend y
              Angular
            </p>
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
export class WelcomeComponent {}
