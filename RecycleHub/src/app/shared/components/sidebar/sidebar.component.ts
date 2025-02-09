import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {NgIf} from '@angular/common';
import {CollectionService} from '../../../core/services/collection-request.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  userName: string | null = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router, private collectionService: CollectionService) {
    this.userName = localStorage.getItem('userName') || 'Utilisateur';
  }

  ngOnInit(): void {
    this.setUserRole();
  }

  setUserRole() {
    const currentUser = this.collectionService.getCurrentUser();
    if (currentUser && currentUser.role) {
      this.userRole = currentUser.role;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
