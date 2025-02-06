import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName: string | null = '';

  constructor(private authService: AuthService) {
    this.userName = localStorage.getItem('userName') || 'Utilisateur';
  }

  logout(): void {
    this.authService.logout();
  }
}
