import { Component, OnInit } from '@angular/core';
import { DemonSlayerService } from '../services/demon-slayer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'kimetsu'; // Mantener el título si se usa en el home
  selectedCharacter: any = null; // Para almacenar el personaje encontrado por ID
  searchId: number | null = null;
  searchAttempted: boolean = false; // Nueva propiedad para rastrear si se ha intentado una búsqueda por ID y no se encontró ningún personaje
  isLoading: boolean = false; // Indicador de carga para la búsqueda por ID
  errorMessage: string | null = null; // Mensaje de error para la búsqueda por ID

  allCharacters: any[] = []; // Para almacenar la lista completa de personajes
  isLoadingAllCharacters: boolean = false; // Indicador de carga para todos los personajes
  errorMessageAllCharacters: string | null = null; // Mensaje de error para todos los personajes

  constructor(private demonSlayerService: DemonSlayerService) { }

  ngOnInit(): void {
    this.loadAllCharacters();
  }

  // Función para convertir un nombre en un slug amigable para la URL
  slugify(name: string): string {
    return name.toLowerCase()
      .replace(/ /g, '-') // Reemplazar espacios con guiones
      .replace(/[^\w-]+/g, ''); // Eliminar caracteres no alfanuméricos (excepto guiones)
  }

  loadAllCharacters(): void {
    this.isLoadingAllCharacters = true;
    this.errorMessageAllCharacters = null;
    this.demonSlayerService.getAllCharacters().subscribe(data => {
      this.isLoadingAllCharacters = false;
      if (data && Array.isArray(data.content)) {
        this.allCharacters = data.content;
      } else {
        this.errorMessageAllCharacters = 'No se pudieron cargar todos los personajes.';
      }
    }, error => {
      console.error('Error al cargar todos los personajes:', error);
      this.isLoadingAllCharacters = false;
      this.errorMessageAllCharacters = 'Error al cargar todos los personajes. Por favor, inténtalo de nuevo más tarde.';
    });
  }

  searchCharacterById(): void {
    this.selectedCharacter = null; // Limpiar el personaje anterior
    this.searchAttempted = false; // Reiniciar el estado de intento de búsqueda
    this.isLoading = true; // Iniciar carga
    this.errorMessage = null; // Limpiar cualquier mensaje de error anterior

    if (this.searchId !== null) {
      this.demonSlayerService.getCharacters(this.searchId).subscribe(data => {
        console.log('Respuesta de la API para el personaje por ID:', data);
        this.isLoading = false; // Finalizar carga
        if (data && Array.isArray(data.content) && data.content.length > 0) {
          this.selectedCharacter = data.content[0]; // Acceder a data.content[0]
        } else {
          this.selectedCharacter = null;
          this.searchAttempted = true; // Establecer en true solo si no se encontró ningún personaje
        }
      }, error => {
        console.error('Error al obtener el personaje por ID:', error);
        this.isLoading = false; // Finalizar carga
        this.selectedCharacter = null;
        this.searchAttempted = true; // Establecer en true en caso de error
        this.errorMessage = 'Error al cargar el personaje. Por favor, inténtalo de nuevo más tarde.';
      });
    } else {
      this.isLoading = false; // Finalizar carga si no hay ID
      this.selectedCharacter = null; // Limpiar el personaje si no se ingresa un ID
      this.searchAttempted = false; // No se intentó buscar si la entrada está vacía
    }
  }
}