import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  // Inscription de l'utilisateur
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

  // Vérifie si l'email existe déjà
  checkEmailExists(email: string): boolean {
    const users = this.getAllUsers();
    return users.some(u => u.email === email);
  }

  // Authentifie l'utilisateur
  authenticate(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password); // Vérifie si l'email et le mot de passe correspondent

    return user !== undefined;
  }

  // Récupère tous les utilisateurs enregistrés
  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}
