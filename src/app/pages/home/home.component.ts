import { Component } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';

import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule , MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss', 
  
})
export default class HomeComponent {

  constructor(){}

  logOut(): void {
    
  }

}
