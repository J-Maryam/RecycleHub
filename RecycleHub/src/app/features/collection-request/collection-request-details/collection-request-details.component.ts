import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CollectionRequest} from '../../../shared/models/collection-request.model';
import {DatePipe, NgClass} from '@angular/common';
import {CollectionService} from '../../../core/services/collection-request.service';

@Component({
  selector: 'app-collection-request-details',
  templateUrl: './collection-request-details.component.html',
  standalone: true,
  imports: [
    NgClass,
    DatePipe
  ],
  styleUrls: ['./collection-request-details.component.css']
})
export class CollectionRequestDetailsComponent {

  constructor(protected collectionService: CollectionService) {}


  @Input() request!: CollectionRequest;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // Émet un événement pour fermer la modale
  }
}
