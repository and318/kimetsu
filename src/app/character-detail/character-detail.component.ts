import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemonSlayerService } from '../services/demon-slayer.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  allCharacters: any[] = [];
  currentCharacterIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demonSlayerService: DemonSlayerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const nameSlug = params.get('nameSlug');
      if (nameSlug) {
        this.isLoading = true;
        this.errorMessage = null;
        // Cargar todos los personajes para encontrar el ID por el slug
        this.demonSlayerService.getAllCharacters().subscribe(allCharsData => {
          if (allCharsData && Array.isArray(allCharsData.content)) {
            this.allCharacters = allCharsData.content;
            const foundCharacter = this.allCharacters.find(char => this.slugify(char.name) === nameSlug);
            if (foundCharacter) {
              this.loadCharacterDetails(foundCharacter.id);
            } else {
              this.errorMessage = 'Personaje no encontrado.';
              this.isLoading = false;
            }
          } else {
            this.errorMessage = 'No se pudieron cargar todos los personajes para la navegación.';
            this.isLoading = false;
          }
        }, error => {
          console.error('Error al cargar todos los personajes para la navegación:', error);
          this.errorMessage = 'Error al cargar datos iniciales. Por favor, inténtalo de nuevo más tarde.';
          this.isLoading = false;
        });
      } else {
        this.errorMessage = 'Nombre de personaje no proporcionado.';
        this.isLoading = false;
      }
    });
  }

  loadCharacterDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.demonSlayerService.getCharacters(id).subscribe(data => {
      this.isLoading = false;
      if (data && Array.isArray(data.content) && data.content.length > 0) {
        this.character = data.content[0];
        // Encontrar el índice del personaje actual en la lista completa
        this.currentCharacterIndex = this.allCharacters.findIndex(char => char.id === this.character.id);
      } else {
        this.errorMessage = 'Personaje no encontrado.';
        this.character = null;
      }
    }, error => {
      console.error('Error al cargar los detalles del personaje:', error);
      this.isLoading = false;
      this.errorMessage = 'Error al cargar los detalles del personaje. Por favor, inténtalo de nuevo más tarde.';
      this.character = null;
    });
  }

  // Función para convertir un nombre en un slug amigable para la URL
  slugify(name: string): string {
    return name.toLowerCase()
      .replace(/ /g, '-') // Reemplazar espacios con guiones
      .replace(/[^\w-]+/g, ''); // Eliminar caracteres no alfanuméricos (excepto guiones)
  }

  goToPreviousCharacter(): void {
    if (this.currentCharacterIndex > 0) {
      const previousCharacter = this.allCharacters[this.currentCharacterIndex - 1];
      this.router.navigate(['/character', this.slugify(previousCharacter.name)]);
    }
  }

  goToNextCharacter(): void {
    if (this.currentCharacterIndex < this.allCharacters.length - 1) {
      const nextCharacter = this.allCharacters[this.currentCharacterIndex + 1];
      this.router.navigate(['/character', this.slugify(nextCharacter.name)]);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
