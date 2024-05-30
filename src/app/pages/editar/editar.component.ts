import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MensajeService } from '../../services/mensaje.service';
import { Tasks } from '../../domain/Tasks'; // Importar la clase Tasks
import { RouterLink } from '@angular/router';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, RouterLink, HomeComponent], // Importar FormsModule y RouterLink
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  task: any; // Variable para almacenar las tareas
  message: string | null = null; // Propiedad para mostrar mensajes
  tasks : Tasks = new Tasks(); // Instancia de la clase Tasks para gestionar las tareas
  
  constructor(private tareasService: MensajeService) {}

  guardar() {
    this.tareasService.addTask(this.tasks); // Método para guardar la tarea
  }
  
  recargarPagina() {
    window.location.reload(); // Método para recargar la página
  }

  ngOnInit() {
    // Método para inicializar el componente y obtener las tareas
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
    // Método para eliminar una tarea
    this.tareasService.deleteTasks(taskId).then(() => {
      console.log('Documento eliminado');
      this.message = 'Se ha eliminado correctamente'; // Mostrar mensaje de éxito
      this.task = this.task.filter((book: any) => book.id !== taskId); // Actualizar lista de tareas
      this.guardar(); // Guardar cambios

      setTimeout(() => this.message = null, 3000); // Ocultar mensaje después de 3 segundos
    }).catch(error => {
      console.log('Error al eliminar', error); // Manejo de errores
    });
  }
}