<<<<<<< HEAD
import { Component , inject } from '@angular/core';
=======
import { Component, OnInit, inject } from '@angular/core';
>>>>>>> d8f775f2db5ac4d16b1ed4765867866791bb965e

import {MatToolbarModule} from '@angular/material/toolbar';

import {MatButtonModule} from '@angular/material/button';
<<<<<<< HEAD

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';


=======
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
>>>>>>> d8f775f2db5ac4d16b1ed4765867866791bb965e
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule , MatButtonModule,CommonModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss', 
  
})
export default class HomeComponent implements OnInit{

  private _router = inject(Router);

<<<<<<< HEAD
  private _router = inject(Router);
=======
  private authservice = inject(AuthService);
  public active: boolean = false;
  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }
 
  

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.active = !this.active;
  }
>>>>>>> d8f775f2db5ac4d16b1ed4765867866791bb965e

  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }
}
