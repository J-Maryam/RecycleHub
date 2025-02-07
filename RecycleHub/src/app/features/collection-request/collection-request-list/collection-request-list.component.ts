import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import {SidebarComponent} from '../../../shared/components/sidebar/sidebar.component';
import {NavbarComponent} from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-collection-request-list',
  templateUrl: './collection-request-list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    SidebarComponent,
    NavbarComponent,
    NgClass
  ],
  styleUrls: ['./collection-request-list.component.css']
})
export class CollectionRequestListComponent {
  requests = [
    { date: new Date(), wasteType: 'Plastic', weight: 2.5, points: 5, status: 'Completed' },
    { date: new Date(), wasteType: 'Glass', weight: 1.2, points: 3, status: 'Pending' },
    { date: new Date(), wasteType: 'Metal', weight: 3.8, points: 7, status: 'Cancelled' },
  ];
}
