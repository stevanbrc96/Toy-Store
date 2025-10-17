import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgFor],
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss']
})
export class StarRating {
  @Input() rating: number = 0;
  maxRating: number = 5;

  get stars() {
    return Array(this.maxRating).fill(0).map((x, i) => i);
  }
}