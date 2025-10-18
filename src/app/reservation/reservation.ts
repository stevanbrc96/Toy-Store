import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Igracka } from '../../models/igracka.model';
import { IgrackaService } from '../../services/igracka.service';
import { KorpaService } from '../../services/shopping-basket.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './reservation.html'
})
export class Reservation implements OnInit {
  igracka = signal<Igracka | null>(null);

  constructor(
    private route: ActivatedRoute,
    private igrackaService: IgrackaService,
    private korpaService: KorpaService,
    private router: Router,
    public utils: Utils
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('toyId');
    if (id) {
      const data = await this.igrackaService.getIgrackaById(id);
      this.igracka.set(data);
    }
  }

  potvrdiRezervaciju(): void {
    const trenutnaIgracka = this.igracka();
    if (trenutnaIgracka) {
      this.korpaService.dodajUKorpu(trenutnaIgracka);
      this.router.navigate(['/korpa']); // Preusmeravamo korisnika direktno u korpu
    }
  }
}