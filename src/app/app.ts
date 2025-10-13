import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Proverite da li je putanja do navbar.ts ispravna
import { NavbarComponent } from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  // Proverite da li je ime fajla app.html
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'prodavnica-igracaka';
}