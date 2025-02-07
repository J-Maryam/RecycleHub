import { Component } from '@angular/core';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    NavbarComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
