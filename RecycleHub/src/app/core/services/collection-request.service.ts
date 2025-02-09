import { Injectable } from '@angular/core';
import { CollectionRequest } from '../../shared/models/collection-request.model';

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

    if (!this.canCreateNewRequest(currentUser.id)) {
      console.error("Vous avez déjà 3 demandes en cours. Veuillez attendre la validation ou le rejet.");
      return;
    }

    request.id = new Date().getTime();
    request.createdAt = new Date();
    request.updatedAt = new Date();
    request.userId = currentUser.id;

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
      if (currentUser && currentUser.id) {
        updatedRequest.userId = currentUser.id;
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

  getInProgressRequestsForCollector(): CollectionRequest[] {
    return this.getAllRequests().filter(request => request.status === 'in-progress');
  }

  updateRequestStatus(requestId: number, newStatus: 'validated' | 'rejected'): void {
    let requests = this.getAllRequests();
    const index = requests.findIndex(request => request.id === requestId);
    if (index !== -1) {
      requests[index].status = newStatus;
      requests[index].updatedAt = new Date();
      this.saveToLocalStorage(requests);
    }
  }

}
