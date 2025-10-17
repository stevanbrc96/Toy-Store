import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
    public utils: Utils
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('toyId');

    if (id) {
      const data = await this.igrackaService.getIgrackaById(id);
      this.igracka.set(data);
    }
  }
  
  rezervisi(igracka: Igracka): void {
    console.log('Rezervisana igračka:', igracka.name);
  }
}
