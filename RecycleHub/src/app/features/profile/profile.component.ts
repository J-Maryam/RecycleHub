import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: 'https://i.pravatar.cc/150?img=3'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  saveChanges(): void {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    alert("Profile updated successfully!");
  }

  deleteAccount(): void {
    if (confirm("Are you sure you want to delete your account?")) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const updatedUsers = users.filter((u: any) => u.email !== this.user.email);

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.removeItem('currentUser');

      alert("Account deleted successfully!");
      this.router.navigate(['/login']);
    }
  }

}
