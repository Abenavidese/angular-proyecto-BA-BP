import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../../core/services/book.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-vistal',
  standalone: true, // Indica que este componente es independiente y no depende de ningún otro módulo de Angular
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HomeComponent], // Importa los módulos necesarios para este componente
  templateUrl: './vistal.component.html', // Ruta al archivo HTML de la plantilla del componente
  styleUrls: ['./vistal.component.scss'] // Rutas a los archivos de estilos del componente
})
export default class VistalComponent implements OnInit { // Definición de la clase del componente, implementa OnInit para ejecutar lógica al inicializar

  books: (Book & { showDetails: boolean; coverUrl: string })[] = []; // Arreglo de libros que incluye información adicional como mostrar detalles y URL de la portada
  query: string = 'programming'; // Palabra clave para buscar libros, inicializada en 'programming'

  constructor(private bookService: BookService) {} // Constructor del componente, inyecta el servicio BookService

  ngOnInit(): void { // Método que se ejecuta al inicializar el componente
    this.searchBooks(); // Llama a la función para buscar libros
  }

  searchBooks(): void { // Función para buscar libros
    this.bookService.searchBooks(this.query).subscribe((data: Book[]) => { // Llama al método del servicio para buscar libros
      this.books = data.map(book => ({ // Mapea los datos de los libros y los asigna al arreglo de libros del componente
        ...book, // Copia todas las propiedades del libro
        showDetails: false, // Añade una propiedad para indicar si se muestran los detalles (inicialmente falso)
        coverUrl: this.bookService.getCoverUrl(book.cover_i), // Obtiene la URL de la portada del libro utilizando el servicio BookService
        shortDescription: this.getShortDescription(book.description, 50) // Genera una descripción corta del libro
      }));
    });
  }
  
  toggleDetails(book: Book & { showDetails: boolean }): void { // Función para alternar la visibilidad de los detalles de un libro
    book.showDetails = !book.showDetails; // Cambia el estado de la propiedad showDetails del libro
  }
  
  getShortDescription(description: string, wordLimit: number): string { // Función para obtener una descripción corta de un libro
    const words = description.split(' '); // Divide la descripción en palabras
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description; // Limita el número de palabras y agrega puntos suspensivos si es necesario
  }
}
