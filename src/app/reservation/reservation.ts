import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Igracka } from '../../models/igracka.model';
import { IgrackaService } from '../../services/igracka.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.scss']
})
export class Reservation implements OnInit {

  igracka = signal<Igracka | null>(null);

  constructor(
    private route: ActivatedRoute,
    private igrackaService: IgrackaService,
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
    if (this.igracka()) {
      console.log('Potvrđena rezervacija za:', this.igracka()!.name);
      // TODO: Implementirati logiku za slanje rezervacije,
      // i prikazati korisniku poruku o uspehu.
    }
  }
}