import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Méthode de soumission du formulaire
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const isAuthenticated = this.authService.authenticate(email, password);

      if (isAuthenticated) {
        console.log('Login réussi');
        // Rediriger vers la page d'accueil ou dashboard, par exemple
      } else {
        this.loginError = 'Email ou mot de passe incorrect';
      }
    } else {
      console.log('Formulaire invalide');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
