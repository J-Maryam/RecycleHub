import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionRequest } from '../../../shared/models/collection-request.model';
import { CollectionService } from '../../../core/services/collection-request.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-collection-request-update',
  templateUrl: './collection-request-update.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class CollectionRequestUpdateComponent {
  @Input() request!: CollectionRequest;
  @Output() closeUpdate = new EventEmitter<void>();

  constructor(private collectionService: CollectionService) {}

  updateRequest() {
    this.collectionService.updateRequest(this.request);
    this.closeUpdate.emit();
  }

  cancelEdit() {
    this.closeUpdate.emit();
  }
}
