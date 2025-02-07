import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CollectionRequest } from '../../shared/models/collection-request.model';
import * as CollectionRequestActions from '../../store/collection-request/collection-request.actions';

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  constructor(private store: Store) {}

  addCollectionRequest(request: CollectionRequest) {
    this.store.dispatch(CollectionRequestActions.addCollectionRequest({ request }));
  }

  loadCollectionRequests() {
    this.store.dispatch(CollectionRequestActions.loadCollectionRequests({ requests: [] }));
  }
}
