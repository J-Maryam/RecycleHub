import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationFailed = false;
  emailExists = false;
  currentStep = 1;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onEmailChange() {
    const email = this.registerForm.get('email')?.value;
    this.emailExists = this.authService.checkEmailExists(email);
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.emailExists) {
      return;
    }

    const success = this.authService.register(this.registerForm.value);
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.registrationFailed = true;
    }
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep) && !this.emailExists) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(step: number): false | undefined | boolean {
    switch (step) {
      case 1:
        return this.registerForm.get('firstName')?.valid &&
          this.registerForm.get('lastName')?.valid &&
          this.registerForm.get('email')?.valid &&
          !this.emailExists;
      case 2:
        return this.registerForm.get('password')?.valid &&
          this.registerForm.get('confirmPassword')?.valid &&
          !this.registerForm.hasError('mismatch');
      case 3:
        return this.registerForm.get('phone')?.valid &&
          this.registerForm.get('address')?.valid &&
          this.registerForm.get('birthDate')?.valid;
      default:
        return false;
    }
  }
}
