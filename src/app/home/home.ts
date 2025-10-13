import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

// ✅ ISPRAVLJENE PUTANJE: Idemo dva nivoa gore (../../) do 'src' foldera
import { Igracka } from '../../models/igracka.model';
import { IgrackaService } from '../../services/igracka.service';

// Putanje za module unutar 'app' foldera idu jedan nivo gore (../)
import { Utils } from '../utils';
import { HeroComponent } from '../layout/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    NgFor,
    HeroComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  sveIgracke = signal<Igracka[]>([]);

  constructor(
    private igrackaService: IgrackaService,
    public utils: Utils
  ) {}

  ngOnInit(): void {
    this.igrackaService.getSveIgracke().then((data: Igracka[]) => {
      this.sveIgracke.set(data);
    });
  }
}