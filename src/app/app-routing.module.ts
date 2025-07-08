import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

/**
 * Definición de las rutas de la aplicación.
 * Cada objeto en el array `routes` define una ruta.
 */
const routes: Routes = [
  // Ruta principal: muestra el HomeComponent cuando la URL es la raíz ('/').
  { path: '', component: HomeComponent },
  // Ruta para los detalles de un personaje: muestra CharacterDetailComponent.
  // `:nameSlug` es un parámetro dinámico que contendrá el nombre slugificado del personaje.
  { path: 'character/:nameSlug', component: CharacterDetailComponent }
];

/**
 * Módulo de enrutamiento de la aplicación.
 * Configura las rutas y exporta RouterModule para que esté disponible en toda la aplicación.
 */
@NgModule({
  // Importa RouterModule y configura las rutas raíz.
  imports: [RouterModule.forRoot(routes)],
  // Exporta RouterModule para que las directivas de enrutamiento (como routerLink y router-outlet) estén disponibles.
  exports: [RouterModule]
})
export class AppRoutingModule { }