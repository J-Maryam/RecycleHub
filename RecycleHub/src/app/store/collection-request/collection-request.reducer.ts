import { createReducer, on } from '@ngrx/store';
import { addCollectionRequest, loadCollectionRequests } from './collection-request.actions';
import {CollectionState} from './collection-request.state';

const initialState: CollectionState = {
  requests: JSON.parse(localStorage.getItem('collectionRequests') || '[]'),
  loading: false
};

export const collectionReducer = createReducer(
  initialState,
  on(loadCollectionRequests, (state, { requests }) => ({ ...state, requests, loading: false })),
  on(addCollectionRequest, (state, { request }) => {
    const updatedRequests = [...state.requests, request];
    localStorage.setItem('collectionRequests', JSON.stringify(updatedRequests));
    return { ...state, requests: updatedRequests, loading: false };
  })
);
