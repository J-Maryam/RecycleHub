import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly USERS_KEY = 'users';

  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  saveUsers(users: any[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
}
