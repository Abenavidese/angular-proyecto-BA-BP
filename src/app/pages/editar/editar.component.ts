import { Component, OnInit } from '@angular/core';
import HomeComponent from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { MensajeService } from '../../services/mensaje.service';
import { Tasks } from '../../domain/Tasks';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [HomeComponent, FormsModule, RouterLink],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  task: any;
  message: string | null = null; // Añadir la propiedad message
  tasks : Tasks = new Tasks()
  
  constructor(private tareasService: MensajeService) {}

  guardar(){
    this.tareasService.addTask(this.tasks);
  }
  recargarPagina() {
    window.location.reload(); // Método para recargar la página
  }
  ngOnInit() {
    this.tareasService.getTasks().then(data => {
      this.task = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
  }

  borrar(taskId: string) {
   
    
    // Eliminar el registro después de guardar
    this.tareasService.deleteTasks(taskId).then(() => {
      console.log('Documento eliminado');
      this.message = 'Se ha eliminado correctamente';
      this.task = this.task.filter((book: any) => book.id !== taskId);
      this.guardar();

      setTimeout(() => this.message = null, 3000); // Ocultar mensaje después de 3 segundos
    }).catch(error => {
      console.log('Error al eliminar', error);
    });
  }
}