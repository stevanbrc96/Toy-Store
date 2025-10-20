import * as bootstrap from 'bootstrap';
import { Component, inject } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { IgrackaService } from '../../services/igracka.service';
import { KorpaService } from '../../services/shopping-basket.service'; 
import { Igracka } from '../../models/igracka.model'; 
import { StarRating } from '../star-rating/star-rating'; 

class ImageUtils {
    private baseUrl = 'https://toy.pequla.com/'; 
    getImageUrl(path: string): string {
        if (!path) return '';
        if (path.startsWith('http')) return path; 
        return this.baseUrl + path;
    }
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, StarRating, CommonModule, RouterLink], 
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  public igrackaService = inject(IgrackaService);
  // NOVO: Ubrizgavanje KorpaService
  public korpaService = inject(KorpaService); 
  public utils = new ImageUtils(); // Dodata instanca Utils klase za korišćenje u HTML-u
  private router = inject(Router);

  // Metoda za rutiranje na detalje
  goToDetails(toyId: number): void {
    this.router.navigate(['/igracka', toyId]);
  }
  
  dodajIKorpa(event: Event, toyId: number): void {
  event.stopPropagation();
  const igracka = this.igrackaService.sveIgracke().find(i => i.toyId === toyId);
  if (!igracka) return;

  this.korpaService.dodajIgracku(igracka);

  const toastEl = document.getElementById('toastKorpa');
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
  }
}
  // Metoda za Max Cenu
  onPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.igrackaService.maxPrice.set(Number(value));
  }
  
  // Metoda za Min Cenu
  onMinPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.igrackaService.minPrice.set(Number(value));
  }

  onRatingChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.igrackaService.minRating.set(Number(value));
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.igrackaService.sortBy.set(value);
  }
}
