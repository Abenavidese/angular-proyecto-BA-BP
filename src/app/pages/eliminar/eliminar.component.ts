import { Component } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.scss'
})
export class EliminarComponent {
  task : any

  constructor(private tareasService: MensajeService){}

  ngOnInit(){
    this.tareasService.getTasks().then(data => {
      this.task = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }
  
  
  
  borrar(taskId: string) {
  this.tareasService.deleteTasks(taskId).then(()=>{
    console.log ('Documento eliminado');
  }).catch(error =>{
    console.log('Error al eliminar', error);
  });
  }
  
}
