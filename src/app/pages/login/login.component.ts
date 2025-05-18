import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError: string = '';
  signupError: string = '';
  isRegisterMode: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  login() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl?.invalid) {
      this.loginError = 'Kérjük, adjon meg egy érvényes email címet!';
      return;
    }

    if (passwordControl?.invalid) {
      this.loginError = 'A jelszó hibás!';
      return;
    }

    const emailValue = emailControl?.value || '';
    const passwordValue = passwordControl?.value || '';

    this.loginError = '';

    this.authService.signIn(emailValue, passwordValue)
      .then(() => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nincs ilyen felhasználó!';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Hibás jelszó!';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Érvénytelen email cím vagy jelszó!';
            break;
          default:
            this.loginError = 'A bejelentkezés során hiba történt. Kérjük, próbálja újra később!';
        }
      });
  }

  register() {
    if (this.signUpForm.invalid) {
      this.signupError = 'Kérjük, töltse ki az összes mezőt!';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;

    if (password !== rePassword) {
      this.signupError = 'A jelszavak nem egyeznek meg!';
      return;
    }

    const userData: any = {
      name: this.signUpForm.value.name || '',
      email: this.signUpForm.value.email || '',
      tariff: [],
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService.signUp(email, pw, userData)
      .then(() => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'Ez az email cím már használatban van!';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Érvénytelen email cím!';
            break;
          case 'auth/weak-password':
            this.signupError = 'A jelszónak legalább 6 karakter hosszúnak kell lennie!';
            break;
          default:
            this.signupError = 'A regisztráció során hiba történt. Kérjük, próbálja újra később!';
        }
      });
  }
}