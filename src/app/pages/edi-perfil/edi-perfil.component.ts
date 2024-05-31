import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserData } from '../../core/services/auth.service';




import { MensajeService } from '../../services/mensaje.service';

import { users } from '../../domain/users';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edi-perfil',
  standalone: true,
  imports: [HomeComponent, RouterLink, FormsModule],
  templateUrl: './edi-perfil.component.html',
  styleUrl: './edi-perfil.component.scss'
})

export class EdiPerfilComponent {
  
  task: any;
  message: string | null = null; // Añadir la propiedad message
  usuario : users = new users()
  
  constructor(private tareasService: MensajeService) {}

  cargarUsuario() {
    this.tareasService.getCurrentUser().then((userData: any) => {
      this.usuario = userData;
    }).catch(error => {
      console.log('Error al cargar usuario', error);
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }
  
  recargarPagina() {
    window.location.reload(); // Método para recargar la página
  }

  borrar(taskId: string) {
   
    
    // Eliminar el registro después de guardar
    this.tareasService.deleteTasks1(taskId).then(() => {
      console.log('Documento eliminado');
      this.message = 'Se ha eliminado correctamente';
      this.task = this.task.filter((book: any) => book.id !== taskId);
      this.guardar();
this.recargarPagina();
      setTimeout(() => this.message = null, 3000); // Ocultar mensaje después de 3 segundos
    }).catch(error => {
      console.log('Error al eliminar', error);
    });
  }

    guardar(){
    this.tareasService.addTask1(this.usuario);
  }

  
}
