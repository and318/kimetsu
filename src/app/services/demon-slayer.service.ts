import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para interactuar con la API de Demon Slayer.
 * Proporciona métodos para obtener datos de personajes.
 */
@Injectable({
  providedIn: 'root'
})
export class DemonSlayerService {
  // URL base de la API de Demon Slayer
  private apiUrl = '/api/v1';

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP de Angular para realizar solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los detalles de un personaje específico por su ID.
   * @param id El ID numérico del personaje a buscar.
   * @returns Un Observable que emite la respuesta de la API, que contiene los detalles del personaje.
   */
  getCharacters(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters?id=${id}`);
  }

  /**
   * Obtiene una lista de todos los personajes disponibles en la API.
   * Limita la cantidad de personajes a 45 para el showcase.
   * @returns Un Observable que emite la respuesta de la API, que contiene una lista de personajes.
   */
  getAllCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters?limit=45`);
  }
}