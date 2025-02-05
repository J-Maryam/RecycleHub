// <!-- register.component.ts -->
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  currentStep = 1;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      alert('Registration Successful!');
    }
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep)) {
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
          this.registerForm.get('email')?.valid;
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
