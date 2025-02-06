import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
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
  userName: string | null = '';

  constructor(private authService: AuthService) {
    this.userName = localStorage.getItem('userName') || 'Utilisateur';
  }

  stats = {
    enAttente: 5,
    enCours: 2,
    valides: 10,
    rejetes: 3,
    points: 250
  };

  logout(): void {
    this.authService.logout();
  }
}
