import { Component, OnInit } from '@angular/core';
import HomeComponent from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { MensajeService } from '../../services/mensaje.service';
import { Tasks } from '../../domain/Tasks';
import { RouterLink } from '@angular/router';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [HomeComponent, FormsModule, RouterLink],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  booksData: any;
  titulo: string = '';
  libros: any[] = []
  libro? : Tasks
  task: any;
  message: string | null = null; // Añadir la propiedad message
  tasks : Tasks = new Tasks()
  
  constructor(private tareasService: MensajeService,private booksService: BookService ) {}

  guardarLibro(title:any, publisher: any,  description: any) {
    this.libro = new Tasks()
    this.libro.title = title
    this.libro.publisher = publisher 
    this.libro.descripcion = description
    this.tareasService.addTask(this.libro)
  this.libro = undefined
     }
 
    
    ngOnInit() {
      this.loadTasks();
    }
    
    loadTasks() {
      this.tareasService.gettask().then(data => {
        this.task = data.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
      });
    }
    
    borrar(id: string): Promise<void> {
      return this.tareasService.deleteTasks(id);
    }
    
    borrarYGuardar(title: any, publisher: any, description: any, id: string) {
      this.borrar(id).then(() => {
        return this.guardarLibro(title, publisher, description);
      }).then(() => {
        this.loadTasks();
        alert('Libro modificado correctamente');
      }).catch(error => {
        console.error("Error al modificar el libro: ", error);
      });
    }

    
  }