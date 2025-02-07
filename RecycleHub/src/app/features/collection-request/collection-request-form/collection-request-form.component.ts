import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {WasteType} from '../../../shared/models/waste-type.enum';
import {CollectionRequest} from '../../../shared/models/collection-request.model';
import {addCollectionRequest} from '../../../store/collection-request/collection-request.actions';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  standalone: true,
  styleUrls: ['./collection-form.component.css']
})
export class CollectionFormComponent {
  private store = inject(Store);

  wasteTypes = Object.values(WasteType);
  title: string = '';
  description: string = '';
  estimatedWeight: number = 0;
  collectionAddress: string = '';
  collectionDate: string = '';
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected' = 'pending';
  notes: string = '';

  addRequest() {
    const newRequest: CollectionRequest = {
      id: Math.floor(Math.random() * 1000), // Génére un ID unique
      userId: 1, // Simuler un userId
      wasteType: this.wasteTypes[0], // Choisir le premier type de déchet
      estimatedWeight: this.estimatedWeight,
      collectionAddress: this.collectionAddress,
      collectionDate: this.collectionDate,
      status: this.status,
      notes: this.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.store.dispatch(addCollectionRequest({ request: newRequest }));
  }
}
