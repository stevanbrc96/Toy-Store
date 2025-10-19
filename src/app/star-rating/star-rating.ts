// src/app/star-rating/star-rating.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss']
})
export class StarRating {
  @Input() rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  getStarClass(value: number): string {
    if (this.rating >= value) return 'fa-solid fa-star';
    if (this.rating >= value - 0.5) return 'fa-solid fa-star-half-stroke';
    return 'fa-regular fa-star';
  }
}
