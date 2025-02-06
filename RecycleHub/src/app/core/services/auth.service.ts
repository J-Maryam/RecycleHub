import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  register(user: User): boolean {
    if (this.checkEmailExists(user.email)) {
      return false; // Retourne false si l'email est déjà utilisé
    }

    user.id = Date.now().toString();
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));

    return true;
  }

  // Vérifie si un email est déjà enregistré
  checkEmailExists(email: string): boolean {
    const users = this.getAllUsers();
    return users.some(u => u.email === email);
  }

  // Récupère tous les utilisateurs depuis localStorage
  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}
