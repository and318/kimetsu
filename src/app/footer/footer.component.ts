import { Component, OnInit } from '@angular/core';

/**
 * Componente del pie de página de la aplicación.
 * Muestra información de derechos de autor y el año actual.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // Propiedad para almacenar el año actual, se calcula al inicializar el componente.
  currentYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    // No hay lógica de inicialización adicional necesaria en este momento.
  }
}