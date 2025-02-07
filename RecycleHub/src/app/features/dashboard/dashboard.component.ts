import { Component } from '@angular/core';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+212 600 000 000',
    avatar: 'https://i.pravatar.cc/150?img=3'
  };
}
