import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // ✅ 1. Uvozimo Router
import { CurrencyPipe } from '@angular/common';

import { Igracka } from '../../models/igracka.model';
import { IgrackaService } from '../../services/igracka.service';
import { Utils } from '../utils';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-toy-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, StarRating],
  templateUrl: './toy-details.html',
  styleUrls: ['./toy-details.scss']
})
export class ToyDetails implements OnInit {

  igracka = signal<Igracka | null>(null);

  constructor(
    private route: ActivatedRoute,
    private igrackaService: IgrackaService,
    public utils: Utils,
    private router: Router // ✅ 2. "Ubrizgavamo" Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('toyId');

    if (id) {
      const data = await this.igrackaService.getIgrackaById(id);
      this.igracka.set(data);
    }
  }
  
  /**
   * ✅ 3. AŽURIRANA METODA: Sada vrši navigaciju na stranicu za rezervaciju.
   */
  rezervisi(igracka: Igracka): void {
    // Koristimo router da odemo na '/rezervisi/:id'
    this.router.navigate(['/rezervisi', igracka.toyId]);
  }
}