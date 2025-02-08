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

  showDetails(request: CollectionRequest) {
    alert(`Détails de la collecte:\n
    - Date : ${request.preferredDate}
    - Type : ${request.wasteTypes.join(', ')}
    - Poids : ${request.estimatedWeight / 1000} kg
    - Utilisateur : ${request.userId}
    - Adresse : ${request.collectionAddress}
    - Statut : ${request.status}`);
  }

  // editRequest(request: CollectionRequest) {
  //   console.log('Modifier la requête:', request);
  //   // Naviguer vers un formulaire d'édition avec l'ID de la requête
  //   this.router.navigate(['/edit-collection', request.id]);
  // }
  //
  // deleteRequest(requestId: number) {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer cette requête ?')) {
  //     this.collectionRequestService.deleteRequest(requestId).subscribe(() => {
  //       this.requests = this.requests.filter(req => req.id !== requestId);
  //     });
  //   }
  // }

}
