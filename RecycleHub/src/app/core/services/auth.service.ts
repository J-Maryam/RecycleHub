import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  private preRegisteredCollecteurs: User[] = [
    {
      id: '1',
      email: 'collecteur1@gmail.com',
      password: '12345678',
      firstName: 'Jean',
      lastName: 'Dupont',
      address: '123 Rue de Paris',
      phone: '0123456789',
      birthDate: new Date('1990-01-01'),
      role: 'collecteur',
      points: 0
    },

  ];

  constructor() {
    this.initializeUsers();
  }

  private initializeUsers() {
    const users = this.getAllUsers();

    if (users.length === 0) {
      this.addPreRegisteredCollecteurs();
    }
  }

  private addPreRegisteredCollecteurs() {
    const users = this.getAllUsers();
    users.push(...this.preRegisteredCollecteurs);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  register(user: User): boolean {
    if (this.checkEmailExists(user.email)) {
      return false;
    }
    user.role = 'particulier';
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
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    console.log("Déconnexion en cours...");
    localStorage.removeItem('userName');
    sessionStorage.clear();

    window.location.href = '/login';
  }

  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

}
