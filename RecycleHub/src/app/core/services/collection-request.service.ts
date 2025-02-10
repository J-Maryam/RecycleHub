import { Injectable } from '@angular/core';
import { CollectionRequest } from '../../shared/models/collection-request.model';
import {WasteType} from '../../shared/models/waste-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private storageKey = 'collectionRequests';
  private usersKey = 'users';

  constructor() {}

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getUserById(userId: number) {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    return users.find((user: { id: number; }) => user.id === userId);
  }

  getAllRequests(): CollectionRequest[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addRequest(request: CollectionRequest): void {
    const requests = this.getAllRequests();
    const currentUser = this.getCurrentUser();

    if (!currentUser || !currentUser.id) {
      console.error("Utilisateur non connecté");
      return;
    }

    const userIdForRequest = request.userId || currentUser.id;
    if (!this.canCreateNewRequest(userIdForRequest)) {
      console.error("Vous avez déjà 3 demandes en cours. Veuillez attendre la validation ou le rejet.");
      return;
    }

    request.id = new Date().getTime();
    request.createdAt = new Date();
    request.updatedAt = new Date();
    request.userId = userIdForRequest;

    if (typeof request.wasteTypes === 'string') {
      request.wasteTypes = [request.wasteTypes];
    }

    requests.push(request);
    this.saveToLocalStorage(requests);
  }

  deleteRequest(requestId: number): void {
    let requests = this.getAllRequests();
    requests = requests.filter(request => request.id !== requestId);
    this.saveToLocalStorage(requests);
  }

  updateRequest(updatedRequest: CollectionRequest): void {
    let requests = this.getAllRequests();
    const index = requests.findIndex(request => request.id === updatedRequest.id);
    if (index !== -1) {
      updatedRequest.updatedAt = new Date();
      const currentUser = this.getCurrentUser();

      // Ne pas changer le userId original
      if (currentUser && currentUser.id) {
        updatedRequest.userId = updatedRequest.userId || currentUser.id;
      }
      requests[index] = updatedRequest;
      this.saveToLocalStorage(requests);
    }
  }

  private saveToLocalStorage(requests: CollectionRequest[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(requests));
  }

  getUserFullName(userId: number): string {
    const user = this.getUserById(userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
  }

  canCreateNewRequest(userId: number): boolean {
    const requests = this.getAllRequests();
    const pendingRequests = requests.filter(req =>
      req.userId === userId && req.status !== 'validated' && req.status !== 'rejected'
    );

    return pendingRequests.length < 3;
  }

  getPendingRequestsForCollector(): CollectionRequest[] {
    // const currentUser = this.getCurrentUser();
    // if (!currentUser || !currentUser.city) return [];

    return this.getAllRequests().filter(request =>
      request.status === 'pending'
      // this.getUserById(request.userId)?.city === currentUser.city
    );
  }

  getOccupiedRequestsForCollector(): CollectionRequest[] {
    return this.getAllRequests().filter(request => request.status === 'occupied');
  }

  startCollection(requestId: number): void {
    let requests = this.getAllRequests();
    const index = requests.findIndex(request => request.id === requestId);

    if (index !== -1) {
      requests[index].status = 'in-progress';
      requests[index].updatedAt = new Date();
      this.saveToLocalStorage(requests);
    }
  }

  updateRequestStatus(requestId: number, newStatus: 'validated' | 'rejected'): void {
    const requests = this.getAllRequests();
    const index = requests.findIndex(request => request.id === requestId);
    if (index !== -1) {
      requests[index].status = newStatus;
      requests[index].updatedAt = new Date();

      if (newStatus === 'validated') {
        const points = this.calculatePoints(requests[index].wasteTypes, requests[index].estimatedWeight);
        requests[index].earnedPoints = points;
        this.updateUserPoints(requests[index].userId, points);
      }

      this.saveToLocalStorage(requests);
    }
  }

  getInProgressRequestsForCollector(): CollectionRequest[] {
    return this.getAllRequests().filter(request => request.status === 'in-progress');
  }

  private calculatePoints(wasteTypes: WasteType[], weight: number): number {
    const pointsPerKg: Record<WasteType, number> = {
      [WasteType.PLASTIC]: 2,
      [WasteType.GLASS]: 1,
      [WasteType.PAPER]: 1,
      [WasteType.METAL]: 5
    };

    return wasteTypes.reduce((total, wasteType) => total + (pointsPerKg[wasteType] || 0) * weight, 0);
  }

  private updateUserPoints(userId: number, points: number): void {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const userIndex = users.findIndex((user: { id: number }) => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex].points = (users[userIndex].points || 0) + points;
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

}
