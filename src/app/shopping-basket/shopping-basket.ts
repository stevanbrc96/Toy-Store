import { Component, inject, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KorpaService } from '../../services/shopping-basket.service';
import { UserService } from '../../services/user.service';
import { RatingModal } from '../rating-modal/rating-modal';
import { KorpaStavka } from '../../services/shopping-basket.service';

@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [CommonModule, RouterLink, RatingModal],
  templateUrl: './shopping-basket.html',
  styleUrls: ['./shopping-basket.scss']
})
export class ShoppingBasket {
  private korpaService = inject(KorpaService);
  private userService = inject(UserService);

  @ViewChild(RatingModal) ratingModal!: RatingModal;

  korisnik = this.userService.currentUser();
  stavke: KorpaStavka[] = [];
  ukupno = 0;

  constructor() {
    effect(() => {
      this.stavke = this.korpaService.korpa();
      this.ukupno = this.korpaService.ukupnaCena();
    });
  }

  povecaj(igrackaId: number): void {
    this.korpaService.povecajKolicinu(igrackaId);
  }

  smanji(igrackaId: number): void {
    this.korpaService.smanjiKolicinu(igrackaId);
  }

  ukloni(igrackaId: number): void {
    this.korpaService.ukloniStavku(igrackaId);
  }

  isprazniKorpu(): void {
    if (confirm('Da li ste sigurni da želite da ispraznite korpu?')) {
      this.korpaService.isprazniKorpu();
    }
  }

  otvoriModalZaOcenu(toyId: number): void {
    this.ratingModal.toyId = toyId;
    this.ratingModal.otvori();
  }
}
