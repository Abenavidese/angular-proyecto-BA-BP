// book.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Definición de la interfaz Book que representa la estructura de un libro
export interface Book {
  title: string; // Título del libro
  author: string; // Autor(es) del libro
  genre: string; // Género(s) del libro
  description: string; // Descripción del libro
  cover_i: number; // Identificador de la portada del libro
  shortDescription?: string; // Descripción corta opcional del libro
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  /**
   * Método para buscar libros en la API externa de OpenLibrary.
   * @param query Consulta de búsqueda para encontrar libros.
   * @returns Un Observable que emite un array de objetos Book que representan los libros encontrados.
   */
  searchBooks(query: string): Observable<Book[]> {
    return this.http.get(`https://openlibrary.org/search.json?q=${query}`).pipe(
      map((response: any) => response.docs.map((doc: any) => ({
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
        genre: doc.subject ? doc.subject.join(', ') : 'N/A',
        description: doc.first_sentence ? doc.first_sentence.join(' ') : 'No description available',
        cover_i: doc.cover_i,
      })))
    );
  }

  /**
   * Método para obtener la URL de la portada de un libro.
   * @param cover_i Identificador de la portada del libro.
   * @returns La URL de la imagen de la portada del libro.
   */
  getCoverUrl(cover_i: number): string {
    return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'assets/default-cover.jpg';
  }
}
