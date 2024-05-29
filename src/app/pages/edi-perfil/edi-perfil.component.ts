import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-edi-perfil',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './edi-perfil.component.html',
  styleUrl: './edi-perfil.component.scss'
})
export class EdiPerfilComponent {
  task : any

}
