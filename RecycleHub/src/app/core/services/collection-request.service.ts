import {Injectable} from '@angular/core';
import {CollectionRequest} from '../../shared/models/collection-request.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private storageKey = 'collectionRequests';

  constructor() {
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

  private saveToLocalStorage(requests: CollectionRequest[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(requests));
  }
}
