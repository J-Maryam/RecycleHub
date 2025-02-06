import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  register(user: User): boolean {
    if (this.checkEmailExists(user.email)) {
      return false;
    }

    user.id = Date.now().toString();
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));

    return true;
  }

  checkEmailExists(email: string): boolean {
    const users = this.getAllUsers();
    return users.some(u => u.email === email);
  }

  authenticate(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password); // Vérifie si l'email et le mot de passe correspondent

    return user !== undefined;
  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('users');
    window.location.href = '/';
  }
  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}
