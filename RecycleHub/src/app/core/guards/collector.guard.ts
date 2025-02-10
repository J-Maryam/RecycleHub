import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollectorGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isCollector()) {
      return true; // Accès autorisé
    } else {
      this.router.navigate(['/login']); // Rediriger si l'utilisateur n'est pas collecteur
      return false;
    }
  }
}
