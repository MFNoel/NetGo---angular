import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isRegisterMode = false;

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  login() {
    // TODO: bejelentkezés logika
    console.log('Bejelentkezés...');
  }

  register() {
    // TODO: regisztráció logika
    console.log('Regisztráció...');
  }
}