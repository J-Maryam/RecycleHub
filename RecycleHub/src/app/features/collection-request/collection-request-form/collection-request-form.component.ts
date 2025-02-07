import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CollectionService} from '../../../core/services/collection-request.service';
import {CollectionRequest} from '../../../shared/models/collection-request.model';
import {NgIf} from '@angular/common';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {NavbarComponent} from '../../../shared/components/navbar/navbar.component';

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
export class CollectionRequestFormComponent {
  collectionRequestForm: FormGroup;

  constructor(private fb: FormBuilder, private collectionRequestService: CollectionService) {
    this.collectionRequestForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      collectionAddress: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.collectionRequestForm.valid) {
      const newRequest: CollectionRequest = {
        id: 1,
        userId: 'user-id',
        ...this.collectionRequestForm.value,
        status: 'En attente'
      };
      this.collectionRequestService.addRequest(newRequest);
      alert('Demande de collecte ajoutée avec succès!');
      this.collectionRequestForm.reset();
    }
  }
}
