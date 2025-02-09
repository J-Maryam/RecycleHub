import { Component, OnInit } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import {CollectionRequest} from '../../../shared/models/collection-request.model';
import {CollectionService} from '../../../core/services/collection-request.service';
import {CollectionRequestDetailsComponent} from '../collection-request-details/collection-request-details.component';
import {CollectionRequestUpdateComponent} from '../collection-request-update/collection-request-update.component';
import {CollectionRequestFormComponent} from '../collection-request-form/collection-request-form.component';

@Component({
  selector: 'app-collection-request-list',
  templateUrl: './collection-request-list.component.html',
  standalone: true,
  imports: [DatePipe, NgForOf, SidebarComponent, NavbarComponent, NgClass, NgIf, CollectionRequestDetailsComponent, CollectionRequestUpdateComponent, CollectionRequestFormComponent],
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent implements OnInit {
  requests: CollectionRequest[] = [];
  selectedRequest: CollectionRequest | null = null;
  editMode = false;
  requestToEdit: CollectionRequest | null = null;
  isModalOpen = false;

  constructor(protected collectionService: CollectionService) {}

  ngOnInit(): void {
    const currentUser = this.collectionService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.requests = this.collectionService.getAllRequests().filter(request => request.userId === currentUser.id);
    }
  }

  openNewRequestModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  showDetails(request: CollectionRequest) {
    this.selectedRequest = request;
  }
  closeDetails() {
    this.selectedRequest = null;
  }

  deleteRequest(requestId: number): void {
    this.collectionService.deleteRequest(requestId);
    this.requests = this.collectionService.getAllRequests();
  }

  confirmDelete(requestId: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.deleteRequest(requestId);
    }
  }

  editRequest(request: CollectionRequest) {
    this.requestToEdit = { ...request };
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.requestToEdit = null;
    this.requests = this.collectionService.getAllRequests();
  }
}
