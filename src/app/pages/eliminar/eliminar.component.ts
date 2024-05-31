import { Component, OnInit, inject } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import HomeComponent from '../home/home.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [HomeComponent,RouterLink],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {
  task: any;
  message: string | null = null; // Añadir la propiedad message
  public active: boolean = false;
  private authservice = inject(AuthService);
  private _router = inject(Router);

  constructor(private tareasService: MensajeService) {}

  ngOnInit() {
    this.tareasService.gettask().then(data => {
      this.task = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
  }

  borrar(id: string) {
    this.tareasService.deleteTasks(id);
    alert('Libro Borrado correctamente');

    this.ngOnInit()
  }

 
}