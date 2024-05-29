import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edi-perfil',
  standalone: true,
  imports: [HomeComponent, RouterLink],
  templateUrl: './edi-perfil.component.html',
  styleUrl: './edi-perfil.component.scss'
})
export class EdiPerfilComponent {
  task : any

}
