import { Component } from '@angular/core';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
}
