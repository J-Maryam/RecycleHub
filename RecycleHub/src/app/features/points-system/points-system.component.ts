import { Component, OnInit } from '@angular/core';
import { PointsService } from '../../services/points.service';
import {NgForOf} from '@angular/common';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {SidebarComponent} from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-points-system',
  templateUrl: './points-system.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NavbarComponent,
    SidebarComponent
  ],
  styleUrls: ['./points-system.component.css']
})
export class PointsSystemComponent implements OnInit {
  points = 0;
  rewardOptions = [
    { cost: 100, reward: 'Bon d\'achat de 50 Dh' },
    { cost: 200, reward: 'Bon d\'achat de 120 Dh' },
    { cost: 500, reward: 'Bon d\'achat de 350 Dh' }
  ];

  constructor(private pointsService: PointsService) {}

  ngOnInit() {
    // Charge les points dès l'initialisation du composant
    this.points = this.pointsService.getPoints();
  }

  convert(cost: number) {
    if (this.pointsService.convertPoints(cost)) {
      // Recharge les points après conversion
      this.points = this.pointsService.getPoints();
      alert('Échange réussi !');
    } else {
      alert('Points insuffisants !');
    }
  }
}
