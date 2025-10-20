import { Injectable, signal, computed } from '@angular/core';
import { Igracka } from '../models/igracka.model';

export interface KorpaStavka {
  igracka: Igracka;
  kolicina: number;
  status: 'rezervisano' | 'pristiglo' | 'otkazano';
}

@Injectable({
  providedIn: 'root'
})
export class KorpaService {
  private korpaState = signal<KorpaStavka[]>([]);

  public korpa = this.korpaState.asReadonly();

  public ukupanBrojStavki = computed(() =>
    this.korpaState().reduce((sum, s) => sum + s.kolicina, 0)
  );

  public ukupnaCena = computed(() =>
    this.korpaState().reduce((sum, s) => sum + (s.igracka.price * s.kolicina), 0)
  );

  constructor() {}

  dodajIgracku(igracka: Igracka, kolicina: number = 1): void {
    this.korpaState.update(stanje => {
      const postoji = stanje.find(s => s.igracka.toyId === igracka.toyId);

      if (postoji) {
        postoji.kolicina += kolicina;
        return [...stanje];
      } else {
        const nova: KorpaStavka = {
          igracka,
          kolicina,
          status: 'rezervisano'
        };

        // Simulacija da igračka "stiže" posle 10 sekundi
        setTimeout(() => {
          this.promeniStatus(igracka.toyId, 'pristiglo');
        }, 10000);

        return [...stanje, nova];
      }
    });
  }

  //  Povećanje količine
  povecajKolicinu(igrackaId: number): void {
    this.korpaState.update(stanje => {
      return stanje.map(s => {
        if (s.igracka.toyId === igrackaId && s.status === 'rezervisano') {
          return { ...s, kolicina: s.kolicina + 1 };
        }
        return s;
      });
    });
  }

  //  Smanjenje količine
  smanjiKolicinu(igrackaId: number): void {
    this.korpaState.update(stanje => {
      return stanje
        .map(s => {
          if (s.igracka.toyId === igrackaId && s.status === 'rezervisano') {
            const novaKolicina = s.kolicina - 1;
            if (novaKolicina <= 0) return null;
            return { ...s, kolicina: novaKolicina };
          }
          return s;
        })
        .filter((s): s is KorpaStavka => s !== null);
    });
  }

  //  Uklanjanje stavke (ako nije otkazano)
  ukloniStavku(igrackaId: number): void {
    this.korpaState.update(stanje =>
      stanje.filter(s => s.igracka.toyId !== igrackaId && s.status !== 'otkazano')
    );
  }

  //  Isprazni korpu
  isprazniKorpu(): void {
    this.korpaState.set([]);
  }

  //  Promena statusa (interno korišćenje)
  private promeniStatus(igrackaId: number, noviStatus: 'rezervisano' | 'pristiglo' | 'otkazano'): void {
    this.korpaState.update(stanje =>
      stanje.map(s =>
        s.igracka.toyId === igrackaId ? { ...s, status: noviStatus } : s
      )
    );
  }

  // Ručno otkazivanje (ako bude potrebno)
  otkaziIgracku(igrackaId: number): void {
    this.promeniStatus(igrackaId, 'otkazano');
  }
}
