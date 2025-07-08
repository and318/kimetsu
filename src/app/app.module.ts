import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

/**
 * Módulo principal de la aplicación Angular.
 * Configura los módulos necesarios y declara los componentes de la aplicación.
 */
@NgModule({
  // Componentes, directivas y pipes que pertenecen a este módulo.
  declarations: [
    AppComponent,
    CharacterDetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  // Otros módulos cuyas clases exportadas son necesarias para las plantillas de los componentes de este módulo.
  imports: [
    BrowserModule, // Módulo para ejecutar la aplicación en un navegador.
    HttpClientModule, // Módulo para realizar solicitudes HTTP.
    FormsModule, // Módulo para trabajar con formularios basados en plantillas.
    AppRoutingModule // Módulo de enrutamiento de la aplicación.
  ],
  // Proveedores de servicios que se inyectarán en la aplicación.
  providers: [],
  // Componente raíz que Angular arranca cuando se carga la aplicación.
  bootstrap: [AppComponent]
})
export class AppModule { }
