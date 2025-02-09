import {Injectable} from '@angular/core';
import {CollectionRequest} from '../../shared/models/collection-request.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private storageKey = 'collectionRequests';

  constructor() {
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getAllRequests(): CollectionRequest[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addRequest(request: CollectionRequest): void {
    const requests = this.getAllRequests();
    request.id = new Date().getTime();
    request.createdAt = new Date();
    request.updatedAt = new Date();
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
      requests[index] = updatedRequest;
      this.saveToLocalStorage(requests);
    }
  }

  private saveToLocalStorage(requests: CollectionRequest[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(requests));
  }
}
