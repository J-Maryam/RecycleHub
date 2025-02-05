// import { Injectable } from '@angular/core';
// import { User } from '../../shared/models/user.model';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private localStorageKey = 'users';
//
//   register(user: User): boolean {
//     const users = this.getAllUsers();
//     const existingUser = users.find(u => u.email === user.email);
//
//     if (existingUser) {
//       return false; // Email déjà utilisé
//     }
//
//     user.id = Date.now().toString();
//     users.push(user);
//     localStorage.setItem(this.localStorageKey, JSON.stringify(users));
//     return true;
//   }
//
//   // login(email: string, password: string): boolean {
//   //   const users = this.getAllUsers();
//   //   const user = users.find(u => u.email === email && u.password === password);
//   //
//   //   if (user) {
//   //     localStorage.setItem('currentUser', JSON.stringify(user));
//   //     return true;
//   //   }
//   //   return false;
//   // }
//   //
//   // logout(): void {
//   //   localStorage.removeItem('currentUser');
//   // }
//   //
//   // private getAllUsers(): User[] {
//   //   const users = localStorage.getItem(this.localStorageKey);
//   //   return users ? JSON.parse(users) : [];
//   // }
// }
