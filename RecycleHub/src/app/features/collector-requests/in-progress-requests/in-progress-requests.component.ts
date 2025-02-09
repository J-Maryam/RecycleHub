import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../core/services/collection-request.service';
import { CollectionRequest } from '../../../shared/models/collection-request.model';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-in-progress-requests',
  templateUrl: './in-progress-requests.component.html',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./in-progress-requests.component.css']
})
export class InProgressRequestsComponent implements OnInit {
  inProgressRequests: CollectionRequest[] = [];

  constructor(protected collectionService: CollectionService) {}

  ngOnInit() {
    this.inProgressRequests = this.collectionService.getInProgressRequestsForCollector();
  }

  validateRequest(requestId: number): void {
    this.collectionService.updateRequestStatus(requestId, 'validated');
    this.inProgressRequests = this.collectionService.getInProgressRequestsForCollector();
  }

  rejectRequest(requestId: number): void {
    this.collectionService.updateRequestStatus(requestId, 'rejected');
    this.inProgressRequests = this.collectionService.getInProgressRequestsForCollector();
  }

}
