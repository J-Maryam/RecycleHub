import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollectionService } from '../../../core/services/collection-request.service';
import { CollectionRequest } from '../../../shared/models/collection-request.model';
import {NgForOf, NgIf} from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import {WasteType} from '../../../shared/models/waste-type.enum';

@Component({
  selector: 'app-collection-request-form',
  templateUrl: './collection-request-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    SidebarComponent,
    NavbarComponent,
    NgForOf
  ],
  styleUrls: ['./collection-request-form.component.css']
})
export class CollectionRequestFormComponent implements OnInit {
  collectionRequestForm!: FormGroup;
  wasteTypes = Object.values(WasteType);
  isModalOpen = true;

  constructor(private fb: FormBuilder, private collectionRequestService: CollectionService) {}

  ngOnInit(): void {
    this.collectionRequestForm = this.fb.group({
      wasteTypes: [[], Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      collectionAddress: ['', Validators.required],
      preferredDate: ['', [Validators.required, this.validateDate]],
      preferredTime: ['', [Validators.required, this.validateTime]],
      notes: ['']
    });

    this.collectionRequestForm.valueChanges.subscribe(() => {
      this.validateTotalWeight();
    });
  }

  closeModal() {
    this.isModalOpen = false;
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
      const currentUser = this.collectionRequestService.getCurrentUser();
      if (!currentUser || !currentUser.id) {
        alert('Utilisateur non connecté!');
        return;
      }

      const canCreateRequest = this.collectionRequestService.canCreateNewRequest(currentUser.id);
      if (!canCreateRequest) {
        alert('Vous avez déjà 3 demandes en cours ou en attente. Veuillez attendre la validation ou le rejet d\'une demande avant d\'en faire une nouvelle.');
        return;
      }

      const newRequest: CollectionRequest = {
        id: new Date().getTime(),
        userId: currentUser.id,
        wasteTypes: this.collectionRequestForm.value.wasteTypes,
        ...this.collectionRequestForm.value,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.collectionRequestService.addRequest(newRequest);
      alert('Demande de collecte ajoutée avec succès!');
      this.collectionRequestForm.reset();
    }
  }

  onWasteTypeChange(event: any) {
    const selectedWasteTypes: string[] = this.collectionRequestForm.value.wasteTypes || [];

    if (event.target.checked) {
      selectedWasteTypes.push(event.target.value);
    } else {
      const index = selectedWasteTypes.indexOf(event.target.value);
      if (index > -1) {
        selectedWasteTypes.splice(index, 1);
      }
    }

    this.collectionRequestForm.patchValue({ wasteTypes: selectedWasteTypes });
  }

  validateTotalWeight(): void {
    const wasteTypes = this.collectionRequestForm.value.wasteTypes;
    const estimatedWeight = this.collectionRequestForm.value.estimatedWeight;
    const totalWeight = wasteTypes.length * (estimatedWeight / 1000);

    if (totalWeight > 10) {
      this.collectionRequestForm.controls['estimatedWeight'].setErrors({
        maxWeightExceeded: true
      });
    }
  }

}
