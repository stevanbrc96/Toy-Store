import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { KorpaStavka, StatusRezervacije } from '../models/shopping-basket.model';
import { Igracka } from '../models/igracka.model';
import { UserService } from './user.service';
import { IgrackaService } from './igracka.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class KorpaService {
  public stavkeKorpe = signal<KorpaStavka[]>([]);

  private userService = inject(UserService);
  private igrackaService = inject(IgrackaService);

  public ukupnaCena = computed(() => {
    return this.stavkeKorpe()
      .filter(item => item.status !== 'otkazano') 
      .reduce((total, item) => total + item.price, 0);
  });

  constructor() {
    effect(() => {
      const korisnik = this.userService.currentUser();
      this.ucitajKorpuZaKorisnika(korisnik);
    });
  }

  
  private async ucitajKorpuZaKorisnika(korisnik: UserModel | null): Promise<void> {
    if (korisnik && korisnik.email === 'petar@primer.com') {
      console.log('Prijavljen je testni korisnik. Preuzimam igračke sa API-ja za korpu...');
      const testnaKorpa = await this.kreirajTestnuKorpuSaApiPodacima();
      this.stavkeKorpe.set(testnaKorpa);
    } else {
      console.log('Korisnik se promenio ili odjavio. Korpa je ispražnjena.');
      this.stavkeKorpe.set([]);
    }
  }

  
  private async kreirajTestnuKorpuSaApiPodacima(): Promise<KorpaStavka[]> {
    const idIgracaka = [1, 5, 8];

    try {
      const igrackePromises = idIgracaka.map(id => this.igrackaService.getIgrackaById(id));
      const preuzeteIgracke = await Promise.all(igrackePromises);

      const validneIgracke = preuzeteIgracke.filter((igracka): igracka is Igracka => igracka !== null);

      const korpa: KorpaStavka[] = [];
      if (validneIgracke[0]) korpa.push({ ...validneIgracke[0], status: 'pristiglo' });
      if (validneIgracke[1]) korpa.push({ ...validneIgracke[1], status: 'pristiglo' });
      if (validneIgracke[2]) korpa.push({ ...validneIgracke[2], status: 'rezervisano' });
      
      return korpa;

    } catch (error) {
      console.error("Greška pri kreiranju testne korpe sa API podacima:", error);
      return [];
    }
  }

  
  dodajUKorpu(igracka: Igracka): void {
    this.stavkeKorpe.update(trenutneStavke => {
      if (trenutneStavke.find(item => item.toyId === igracka.toyId)) {
        alert('Ova igračka se već nalazi u vašoj korpi.');
        return trenutneStavke; 
      }
      
      const novaStavka: KorpaStavka = { ...igracka, status: 'rezervisano' };
      return [...trenutneStavke, novaStavka];
    });
  }
 
  
  ukloniIzKorpe(toyId: number): void {
    const stavkaZaBrisanje = this.stavkeKorpe().find(item => item.toyId === toyId);

    if (stavkaZaBrisanje && stavkaZaBrisanje.status === 'pristiglo') {
      this.stavkeKorpe.update(stavke => stavke.filter(item => item.toyId !== toyId));
      alert(`Igračka "${stavkaZaBrisanje.name}" je uspešno obrisana iz korpe.`);
    } else {
      alert(`Brisanje nije dozvoljeno. Status rezervacije je '${stavkaZaBrisanje?.status}'.`);
    }
  }
  
  
  izmeniStavkuUKorpi(toyId: number, podaci: Partial<KorpaStavka>): void {
    alert("Funkcionalnost izmene podataka još uvek nije implementirana.");
  }
  
  
  promeniStatusStavke(toyId: number, noviStatus: StatusRezervacije): void {
    this.stavkeKorpe.update(stavke => 
      stavke.map(item => 
        item.toyId === toyId ? { ...item, status: noviStatus } : item
      )
    );
  }
}