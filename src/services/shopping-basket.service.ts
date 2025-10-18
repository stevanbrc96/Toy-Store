import { Injectable, signal, computed } from '@angular/core';
import { KorpaStavka, StatusRezervacije } from '../models/shopping-basket.model';
import { Igracka } from '../models/igracka.model';

@Injectable({
  providedIn: 'root'
})
export class KorpaService {
  // Signal koji čuva sve stavke u korpi.
  public stavkeKorpe = signal<KorpaStavka[]>([]);

  // Computed signal koji automatski računa ukupnu cenu.
  public ukupnaCena = computed(() => {
    return this.stavkeKorpe()
      .filter(item => item.status !== 'otkazano') // Ne računamo otkazane
      .reduce((total, item) => total + item.price, 0);
  });

  constructor() { }

  /**
   * Dodaje igračku u korpu sa statusom 'rezervisano'.
   */
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

  /**
   * Uklanja stavku iz korpe samo ako je njen status 'pristiglo' ili 'otkazano'.
   */
  ukloniIzKorpe(toyId: number): void {
    const stavkaZaBrisanje = this.stavkeKorpe().find(item => item.toyId === toyId);

    if (stavkaZaBrisanje && stavkaZaBrisanje.status === 'pristiglo') {
      this.stavkeKorpe.update(stavke => stavke.filter(item => item.toyId !== toyId));
      alert(`Igračka "${stavkaZaBrisanje.name}" je uspešno obrisana iz korpe.`);
    } else {
      alert(`Brisanje nije dozvoljeno. Status rezervacije je '${stavkaZaBrisanje?.status}'.`);
    }
  }

  /**
   * Menja podatke o igrački samo ako je status 'rezervisano'.
   */
  izmeniStavkuUKorpi(toyId: number, podaci: Partial<KorpaStavka>): void {
    // Implementacija ove metode zavisi od toga koje podatke korisnik može da menja.
    // Za sada, samo ispisujemo poruku.
    alert("Funkcionalnost izmene podataka još uvek nije implementirana.");
  }
  
  /**
   * Pomoćna metoda za simulaciju promene statusa (npr. admin potvrdio da je stiglo).
   */
  promeniStatusStavke(toyId: number, noviStatus: StatusRezervacije): void {
    this.stavkeKorpe.update(stavke => 
      stavke.map(item => 
        item.toyId === toyId ? { ...item, status: noviStatus } : item
      )
    );
  }
}