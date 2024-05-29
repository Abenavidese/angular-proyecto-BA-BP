import { Component } from '@angular/core';
import { Tasks } from '../../domain/Tasks';
import { MensajeService } from '../../services/mensaje.service';
import { FormsModule } from '@angular/forms';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-anadir',
  standalone: true,
  imports: [FormsModule, HomeComponent],
  templateUrl: './anadir.component.html',
  styleUrl: './anadir.component.scss'
})
export class AnadirComponent {
  tasks : Tasks = new Tasks()

  constructor(private mensajeService: MensajeService){}

  guardar(){
    
    this.mensajeService.addTask(this.tasks)
  }

}


