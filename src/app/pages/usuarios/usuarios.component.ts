import { Component } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import { RouterLink } from '@angular/router';
import { users } from '../../domain/users'; // Importar la interfaz de usuarios
import { FormsModule } from '@angular/forms';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [HomeComponent, RouterLink, FormsModule], // Importar los módulos necesarios
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  task: any; // Variable para almacenar los usuarios
  message: string | null = null; // Propiedad para mostrar mensajes
  usuario: users = new users(); // Instancia de la interfaz de usuario para gestionar usuarios
  
  constructor(private tareasService: MensajeService) {}

  guardar() {
    this.tareasService.addTask1(this.usuario); // Método para guardar el usuario
  }

  ngOnInit() {
    // Método para inicializar el componente y obtener los usuarios
    this.tareasService.getTasks1().then(data => {
      this.task = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
  }

  recargarPagina() {
    window.location.reload(); // Método para recargar la página
  }

  borrar(taskId: string) {
    // Método para eliminar un usuario
    this.tareasService.deleteTasks1(taskId).then(() => {
      console.log('Documento eliminado');
      this.message = 'Se ha eliminado correctamente'; // Mostrar mensaje de éxito
      this.task = this.task.filter((book: any) => book.id !== taskId); // Actualizar lista de usuarios
      this.guardar(); // Guardar cambios

      setTimeout(() => this.message = null, 3000); // Ocultar mensaje después de 3 segundos
    }).catch(error => {
      console.log('Error al eliminar', error); // Manejo de errores
    });
  }
}
