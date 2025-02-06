import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  register(user: User): boolean {
    const users = this.getAllUsers();
    const existingUser = users.find(u => u.email === user.email);

    if (existingUser) {
      return false;
    }

    user.id = Date.now().toString();
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}
