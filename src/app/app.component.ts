import { Component } from '@angular/core';

/**
 * Componente raíz de la aplicación Angular.
 * Contiene la estructura principal de la aplicación, incluyendo el encabezado, el área de contenido dinámico (router-outlet) y el pie de página.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Título de la aplicación, utilizado en la plantilla.
  title = 'kimetsu';
}
