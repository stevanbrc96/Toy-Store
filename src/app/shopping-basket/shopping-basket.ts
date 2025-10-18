import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { KorpaService } from '../../services/shopping-basket.service';
import { UserService } from '../../services/user.service';
import { StatusRezervacije } from '../../models/shopping-basket.model'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './shopping-basket.html',
  styleUrls: ['./shopping-basket.scss']
})
export class Cart {
  constructor(
    public korpaService: KorpaService,
    private userService: UserService,
    private router: Router
  ) {
    // Zaštita rute: ako korisnik nije prijavljen, vrati ga na login
    if (!this.userService.currentUser()) {
      this.router.navigateByUrl('/prijava');
    }
  }

  // Pomoćne metode za simulaciju promene statusa
  postaviStatusPristiglo(toyId: number): void {
    this.korpaService.promeniStatusStavke(toyId, 'pristiglo');
  }

  postaviStatusOtkazano(toyId: number): void {
    this.korpaService.promeniStatusStavke(toyId, 'otkazano');
  }
}