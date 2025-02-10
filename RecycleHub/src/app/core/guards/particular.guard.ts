import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParticularGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isParticular()) {
      return true; // Accès autorisé
    } else {
      this.router.navigate(['/login']); // Rediriger si l'utilisateur n'est pas particulier
      return false;
    }
  }
}
