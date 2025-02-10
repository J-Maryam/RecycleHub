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
import {PointsSystemComponent} from './features/points-system/points-system.component';
import {AuthGuard} from './core/guards/auth.guard';
import {GuestGuard} from './core/guards/guest.guard';
import {CollectorGuard} from './core/guards/collector.guard';
import {ParticularGuard} from './core/guards/particular.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },

  // Routes accessibles uniquement par les collecteurs
  { path: 'pending-collections', component: CollectorRequestsComponent, canActivate: [CollectorGuard] },
  { path: 'occupied-collections', component: OccupiedRequestsComponent, canActivate: [CollectorGuard] },
  { path: 'in-progress-collections', component: InProgressRequestsComponent, canActivate: [CollectorGuard] },

  // Routes accessibles uniquement par les particuliers
  { path: 'my-collections', component: CollectionRequestListComponent, canActivate: [ParticularGuard] },
  { path: 'addCollection', component: CollectionRequestFormComponent, canActivate: [ParticularGuard] },

  // Routes génériques protégées
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard] },
  { path: 'my-points', component: PointsSystemComponent, canActivate: [AuthGuard] }
];
