import { Injectable } from '@angular/core';

// ✅ POPRAVKA: Dodat je @Injectable() da bi klasa bila servis.
@Injectable({
  providedIn: 'root'
})
// ✅ POPRAVKA: Klasa je izvezena (exported) da bi se mogla uvesti u drugim fajlovima.
export class Utils {
  private readonly BASE_API_URL = 'https://toy.pequla.com';

  constructor() { }

  public getImageUrl(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/300x250.png?text=Nema+Slike';
    }
    return `${this.BASE_API_URL}${imagePath}`;
  }
}