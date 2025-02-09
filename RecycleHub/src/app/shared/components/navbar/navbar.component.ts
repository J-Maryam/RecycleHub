import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../../core/services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isCollecteur(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === 'collecteur';
  }

  isParticulier(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === 'particulier';
  }

}
