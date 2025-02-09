import { Component, OnInit } from '@angular/core';
import {CollectionService} from '../../core/services/collection-request.service';
import { CollectionRequest } from '../../shared/models/collection-request.model';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collector-requests',
  templateUrl: './collector-requests.component.html',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./collector-requests.component.css']
})
export class CollectorRequestsComponent implements OnInit {
  pendingRequests: CollectionRequest[] = [];

  constructor(protected collectionService: CollectionService) {}

  ngOnInit() {
    this.pendingRequests = this.collectionService.getPendingRequestsForCollector();
  }

  acceptRequest(request: CollectionRequest) {
    request.status = 'occupied';
    this.collectionService.updateRequest(request);
    this.ngOnInit();
  }

  // confirmAcceptRequest(request: any) {
  //   const confirmation = confirm(`Êtes-vous sûr de vouloir accepter la demande #${request.id} ?`);
  //
  //   if (confirmation) {
  //     this.acceptRequest(request);
  //   }
  // }


  confirmAcceptRequest(request: any) {
    Swal.fire({
      title: "Accepter cette demande ?",
      text: `Êtes-vous sûr de vouloir accepter la demande #${request.id} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, accepter ✅",
      cancelButtonText: "Annuler ❌"
    }).then((result) => {
      if (result.isConfirmed) {
        this.acceptRequest(request);
        Swal.fire("Acceptée !", "La demande a été acceptée avec succès.", "success");
      }
    });
  }

}
