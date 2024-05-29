import { Component, OnInit } from '@angular/core';
import HomeComponent from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { Tasks } from '../../domain/Tasks';
import { MensajeService } from '../../services/mensaje.service';
@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [HomeComponent, FormsModule],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  task: any;
  message: string | null = null; // Añadir la propiedad message

  constructor(private tareasService: MensajeService) {}

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
  onSubmit(){}

  onSelectBook(){}
  
}