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
    }
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
      const token = this.generateToken(user); // Génère un token
      localStorage.setItem('currentUser', JSON.stringify({ ...user, token }));
      return true;
    }
    return false;
  }

  private generateToken(user: User): string {
    // Tu peux créer un token simple ou utiliser une bibliothèque pour cela
    // Ici, on utilise juste un token "dummy" pour l'exemple
    return btoa(user.email + ':' + Date.now()); // Crée un token basé sur l'email et la date actuelle
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isCollector() {
    const user = this.getCurrentUser();
    return user && user.role === 'collector'; // Ou tout autre critère pour identifier un collecteur
  }

  isParticular() {
    const user = this.getCurrentUser();
    return user && user.role === 'particular'; // Ou tout autre critère pour identifier un particulier
  }

  logout(): void {
    console.log("Déconnexion en cours...");
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }

  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return !!currentUser;
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.token || null;
  }
}
