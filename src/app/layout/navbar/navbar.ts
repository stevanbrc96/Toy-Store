import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  // Privremeni signali za prikaz login/logout stanja.
  // Kasnije ćete ih povezati sa pravim servisom za autentifikaciju.
  hasAuth = signal(false);
  currentUser = signal<{ email: string } | null>(null);

  // Privremena metoda za odjavu
  logoutNow(): void {
    this.hasAuth.set(false);
    this.currentUser.set(null);
    // TODO: Dodati navigaciju na početnu stranu nakon odjave.
  }
}