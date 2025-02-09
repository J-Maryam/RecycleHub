import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {LoginComponent} from './features/auth/login/login.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {ProfileComponent} from './features/profile/profile.component';
import {
  CollectionRequestListComponent
} from './features/collection-request/collection-request-list/collection-request-list.component';
import {
  CollectionRequestFormComponent
} from './features/collection-request/collection-request-form/collection-request-form.component';
import {CollectorRequestsComponent} from './features/collector-requests/pending-requests/collector-requests.component';
import {OccupiedRequestsComponent} from './features/collector-requests/occupied-requests/occupied-requests.component';
import {
  InProgressRequestsComponent
} from './features/collector-requests/in-progress-requests/in-progress-requests.component';
import {HistoriqueComponent} from './features/historique/historique.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-collections', component: CollectionRequestListComponent },
  { path: 'addCollection', component: CollectionRequestFormComponent },
  { path: 'pending-collections', component: CollectorRequestsComponent },
  { path: 'occupied-collections', component: OccupiedRequestsComponent },
  { path: 'in-progress-collections', component: InProgressRequestsComponent },
  { path: 'historique', component: HistoriqueComponent }
];
