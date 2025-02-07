import { createAction, props } from '@ngrx/store';
import { CollectionRequest } from '../../shared/models/collection-request.model';

export const addCollectionRequest = createAction(
  '[Collection] Add Request',
  props<{ request: CollectionRequest }>()
);

export const loadCollectionRequests = createAction(
  '[Collection] Load Requests',
  props<{ requests: CollectionRequest[] }>()
);
