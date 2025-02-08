import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollectionService } from '../../../core/services/collection-request.service';
import { CollectionRequest } from '../../../shared/models/collection-request.model';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-collection-request-form',
  templateUrl: './collection-request-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    SidebarComponent,
    NavbarComponent
  ],
  styleUrls: ['./collection-request-form.component.css']
})
export class CollectionRequestFormComponent implements OnInit {
  collectionRequestForm!: FormGroup;

  constructor(private fb: FormBuilder, private collectionRequestService: CollectionService) {}

  ngOnInit(): void {
    this.collectionRequestForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      collectionAddress: ['', Validators.required],
      preferredDate: ['', [Validators.required, this.validateDate]],
      preferredTime: ['', [Validators.required, this.validateTime]],
      notes: ['']
    });
  }

  validateDate(control: any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate <= today) {
      return { invalidDate: true };
    }
    return null;
  }

  validateTime(control: any): { [key: string]: boolean } | null {
    const selectedTime = control.value;
    if (selectedTime < '09:00' || selectedTime > '18:00') {
      return { invalidTime: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.collectionRequestForm.valid) {
      const newRequest: CollectionRequest = {
        id: new Date().getTime(),
        userId: '1',
        ...this.collectionRequestForm.value,
        status: 'En attente',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.collectionRequestService.addRequest(newRequest);
      alert('Demande de collecte ajoutée avec succès!');
      this.collectionRequestForm.reset();
    }
  }
}
