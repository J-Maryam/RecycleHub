import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {CollectionEffects} from './store/collection-request/collection-request.effects';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {collectionReducer} from './store/collection-request/collection-request.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideStore({ collection: collectionReducer }),
    provideEffects(CollectionEffects),]
};
