import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    SidebarComponent
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+212 600 000 000',
    avatar: 'https://i.pravatar.cc/150?img=3'
  };

  editMode = false;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    alert("Profile updated successfully!");
    this.editMode = false;
  }
}
