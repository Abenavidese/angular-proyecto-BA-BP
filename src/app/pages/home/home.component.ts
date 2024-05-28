import { Component, OnInit } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';

import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule , MatButtonModule,CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss', 
  
})
export default class HomeComponent implements OnInit{


  logOut(): void {
    
  }
  public active: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.active = !this.active;
  }

}
