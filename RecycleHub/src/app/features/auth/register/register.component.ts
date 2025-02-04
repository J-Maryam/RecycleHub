// register.component.ts
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
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      profileImage: [null]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ profileImage: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep)) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    this.currentStep--;
  }

  isStepValid(step: number): boolean {
    const controls = this.registerForm.controls;
    switch(step) {
      case 1:
        return controls['firstName'].valid &&
          controls['lastName'].valid &&
          controls['email'].valid;
      case 2:
        return controls['password'].valid &&
          controls['confirmPassword'].valid &&
          !this.registerForm.hasError('mismatch');
      case 3:
        return controls['phone'].valid &&
          controls['address'].valid &&
          controls['birthDate'].valid;
      default:
        return false;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle form submission
    }
  }
}
