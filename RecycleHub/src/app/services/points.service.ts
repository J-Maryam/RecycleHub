import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private readonly userKey = 'currentUser'; // Clé pour récupérer l'utilisateur connecté
  private readonly requestsKey = 'requests'; // Clé pour récupérer les demandes (collecte)

  constructor() {}

  // Récupérer l'utilisateur actuellement connecté dans localStorage
  getCurrentUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Récupérer les points de l'utilisateur connecté
  getPoints(): number {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.points !== undefined) {
      return currentUser.points;
    }
    return 0; // Retourner 0 si l'utilisateur n'a pas de points définis
  }

  // Mise à jour des points de l'utilisateur connecté
  setPoints(points: number): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.points = points; // Mise à jour des points
      localStorage.setItem(this.userKey, JSON.stringify(currentUser)); // Sauvegarder l'utilisateur modifié dans localStorage
    }
  }

  // Méthode convertPoints pour échanger des points contre une récompense
  convertPoints(cost: number): boolean {
    const currentPoints = this.getPoints();

    if (currentPoints >= cost) {
      const updatedPoints = currentPoints - cost; // Soustraire les points utilisés
      this.setPoints(updatedPoints); // Mise à jour des points de l'utilisateur
      return true; // L'échange a réussi
    }

    return false; // L'échange a échoué, points insuffisants
  }

  // Calcul des points en fonction des déchets collectés
  calculatePoints(wasteTypes: string[], estimatedWeight: number): number {
    let totalPoints = 0;

    // Calcul des points en fonction des types de déchets
    wasteTypes.forEach(wasteType => {
      switch (wasteType.toLowerCase()) {
        case 'plastique':
          totalPoints += 2 * estimatedWeight; // 2 points par kg de plastique
          break;
        case 'verre':
          totalPoints += 1 * estimatedWeight; // 1 point par kg de verre
          break;
        case 'papier':
          totalPoints += 1 * estimatedWeight; // 1 point par kg de papier
          break;
        case 'métal':
          totalPoints += 5 * estimatedWeight; // 5 points par kg de métal
          break;
        default:
          break;
      }
    });

    return totalPoints;
  }

  // Mise à jour des points après validation de la demande (points attribués au particulier)
  updatePointsAfterRequest(requestId: number): void {
    const requests = JSON.parse(localStorage.getItem(this.requestsKey) || '[]');
    const request = requests.find((req: any) => req.id === requestId);

    if (request && request.userId) {
      const pointsEarned = this.calculatePoints(request.wasteTypes, request.estimatedWeight);

      // Récupérer l'utilisateur particulier qui a créé la demande
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === request.userId) {
        const updatedPoints = currentUser.points + pointsEarned;
        this.setPoints(updatedPoints); // Mise à jour des points de l'utilisateur particulier
        alert('Points attribués avec succès !');
      }
    }
  }
}
