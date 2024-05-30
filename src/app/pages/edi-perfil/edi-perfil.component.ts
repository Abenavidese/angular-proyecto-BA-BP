import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserData } from '../../core/services/auth.service';

@Component({
  selector: 'app-edi-perfil',
  standalone: true,
  imports: [HomeComponent, RouterLink],
  templateUrl: './edi-perfil.component.html',
  styleUrl: './edi-perfil.component.scss'
})
export class EdiPerfilComponent {
  task : any

  constructor(private authService: AuthService) {} // Inyectar el servicio AuthService

  async actualizarPerfil(): Promise<void> {
    const userId = 'id_del_usuario_actual'; // Obtén el ID del usuario actual
    const nombre = (document.getElementById('actualizar-nombre') as HTMLInputElement).value;
    const email = (document.getElementById('actualizar-email') as HTMLInputElement).value;
    const contrasena = (document.getElementById('actualizar-contrasena') as HTMLInputElement).value;
    
    // Aquí estás proporcionando la propiedad 'role' requerida por el tipo 'UserData'
    const userData: UserData = {
      role: 'visitor', // O 'admin', dependiendo del caso
      displayName: nombre,
      email: email
    };
  
    try {
      await this.authService.updateUserData(userId, userData);
  
      console.log('Datos del usuario actualizados correctamente.');
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  }
  
}
