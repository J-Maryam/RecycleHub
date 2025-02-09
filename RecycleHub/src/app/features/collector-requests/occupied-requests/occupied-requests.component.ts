import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../core/services/collection-request.service';
import { CollectionRequest } from '../../../shared/models/collection-request.model';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-occupied-requests',
  templateUrl: './occupied-requests.component.html',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./occupied-requests.component.css']
})
export class OccupiedRequestsComponent implements OnInit {
  occupiedRequests: CollectionRequest[] = [];

  constructor(protected collectionService: CollectionService) {}

  ngOnInit() {
    this.occupiedRequests = this.collectionService.getOccupiedRequestsForCollector();
  }
}
