import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addCollectionRequest, loadCollectionRequests } from './collection-request.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions) {}

  loadRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCollectionRequests),
      tap(() => {
        const requests = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
        return loadCollectionRequests({ requests });
      })
    ), { dispatch: false }
  );

  saveRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCollectionRequest),
      tap(({ request }) => {
        const requests = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
        requests.push(request);
        localStorage.setItem('collectionRequests', JSON.stringify(requests));
      })
    ), { dispatch: false }
  );
}
