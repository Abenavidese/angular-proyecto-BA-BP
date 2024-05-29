import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import HomeComponent from '../home/home.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {
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

  borrar(taskId: string) {
    this.tareasService.deleteTasks(taskId).then(() => {
      console.log('Documento eliminado');
      this.message = 'Se ha eliminado correctamente';
      this.task = this.task.filter((book: any) => book.id !== taskId);
      setTimeout(() => this.message = null, 3000); // Ocultar mensaje después de 3 segundos
    }).catch(error => {
      console.log('Error al eliminar', error);
    });
  }
}