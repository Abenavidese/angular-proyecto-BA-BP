import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { FormsModule, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import HomeComponent from '../home/home.component';
import { MensajeService } from '../../services/mensaje.service';
import { Tasks } from '../../domain/Tasks';

@Component({
  selector: 'app-vistal',
  standalone: true, // Indica que este componente es independiente y no depende de ningún otro módulo de Angular
  imports: [RouterLink, HomeComponent, FormsModule], // Importa los módulos necesarios para este componente
  templateUrl: './vistal.component.html', // Ruta al archivo HTML de la plantilla del componente
  styleUrls: ['./vistal.component.scss'] // Rutas a los archivos de estilos del componente
})
export default class VistalComponent { 
  booksData: any;
  titulo: string = '';
  libros: any[] = []
  libro? : Tasks

  constructor(private booksService: BookService, private fireStoreService: MensajeService) { }

  ngOnInit(): void {

  }

  buscarLibros() {
    this.libros = []
    this.booksService.obtenerLibros(this.titulo).subscribe(data => {
      this.booksData = Object.assign({}, data)

      this.booksData.items.map((item: any) => {
        console.log(item.volumeInfo);
        this.libros.push(item.volumeInfo)
        console.log(`agregando ${item.volumeInfo.title}`);
      })
    })
    this.titulo = ''
  }
  guardarLibro(title:any, publisher: any,  description: any) {
    this.libro = new Tasks()
    this.libro.title = title
    this.libro.publisher = publisher 
    this.libro.descripcion = description
    this.fireStoreService.addTask(this.libro)
    alert('libro agregado correctamente')
    this.libro = undefined
  }

  }

