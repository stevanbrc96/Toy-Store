import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';

import { IgrackaService } from '../../services/igracka.service';
import { KorpaService } from '../../services/shopping-basket.service';

import { Igracka } from '../../models/igracka.model';
import { Recenzija } from '../../models/recenzija.model';

import { StarRating } from '../star-rating/star-rating';
import { RatingModal } from '../rating-modal/rating-modal';

@Component({
  selector: 'app-toy-details',
  standalone: true,
  imports: [CommonModule, StarRating, RatingModal],
  templateUrl: './toy-details.html',
  styleUrls: ['./toy-details.scss']
})
export class ToyDetails {
  private route = inject(ActivatedRoute);
  private igrackaService = inject(IgrackaService);
  private korpaService = inject(KorpaService);

  loading = true;
  igracka: Igracka | null = null;
  recenzije: Recenzija[] = [];

  constructor() {
    // 🔹 učitaj detalje igračke
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.igrackaService.getIgrackaById(id).then(igr => {
          this.igracka = igr;
          this.loading = false;
          if (igr) {
            this.recenzije = [...this.igrackaService.getRecenzijeZaIgracku(igr.toyId)];
          }
        });
      }
    });

    // 🔹 automatsko osvežavanje kad se doda nova recenzija
    effect(() => {
      this.igrackaService.recenzijeOsvezene();
      if (this.igracka) {
        const toyId = this.igracka.toyId;
        this.recenzije = [...this.igrackaService.getRecenzijeZaIgracku(toyId)];
        const azurirana = this.igrackaService.sveIgracke().find(i => i.toyId === toyId);
        if (azurirana) {
          this.igracka = { ...this.igracka, rating: azurirana.rating };
        }
      }
    });
  }

  // 🔹 dodaj igračku u korpu + prikaži toast
  dodajUKorpu(): void {
    if (!this.igracka) return;

    this.korpaService.dodajIgracku(this.igracka);

    const toastEl = document.getElementById('toastKorpa');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
      toast.show();
    }
  }

  // 🔹 ručno osveži recenzije (poziva se iz rating-modal)
  osveziRecenzije(): void {
    if (!this.igracka) return;

    const toyId = this.igracka.toyId;
    this.recenzije = [...this.igrackaService.getRecenzijeZaIgracku(toyId)];

    const azurirana = this.igrackaService.sveIgracke().find(i => i.toyId === toyId);
    if (azurirana) {
      this.igracka = { ...this.igracka, rating: azurirana.rating };
    }
  }
}
