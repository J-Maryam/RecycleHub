import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../core/services/collection-request.service';
import { CollectionRequest } from '../../shared/models/collection-request.model';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    NgIf,
    NgForOf,
    NgClass
  ],
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  allRequests: CollectionRequest[] = [];

  constructor(protected collectionService: CollectionService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    const allRequests = this.collectionService.getAllRequests();
    this.allRequests = allRequests.filter(request =>
      request.status === 'validated' || request.status === 'rejected');
  }
}
