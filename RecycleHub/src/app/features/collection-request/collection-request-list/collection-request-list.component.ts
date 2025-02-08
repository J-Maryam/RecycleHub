import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import {CollectionRequest} from '../../../shared/models/collection-request.model';
import {CollectionService} from '../../../core/services/collection-request.service';

@Component({
  selector: 'app-collection-request-list',
  templateUrl: './collection-request-list.component.html',
  standalone: true,
  imports: [DatePipe, NgForOf, SidebarComponent, NavbarComponent, NgClass],
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent implements OnInit {
  requests: CollectionRequest[] = [];

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.requests = this.collectionService.getAllRequests();
    console.log(this.collectionService.getAllRequests());
  }

}
