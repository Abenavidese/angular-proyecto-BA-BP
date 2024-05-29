import { Component } from '@angular/core';
import { Tasks } from '../../domain/Tasks';
import { MensajeService } from '../../services/mensaje.service';
import { FormsModule } from '@angular/forms';
import HomeComponent from '../home/home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anadir',
  standalone: true,
  imports: [FormsModule, HomeComponent, RouterLink],
  templateUrl: './anadir.component.html',
  styleUrl: './anadir.component.scss'
})
export default class AnadirComponent {
  tasks : Tasks = new Tasks()

  constructor(private mensajeService: MensajeService){}

  guardar(){
    
    this.mensajeService.addTask(this.tasks)
  }

}


