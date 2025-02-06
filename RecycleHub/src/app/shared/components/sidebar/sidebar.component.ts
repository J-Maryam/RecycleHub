import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userName: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userName = localStorage.getItem('userName') || 'Utilisateur';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
