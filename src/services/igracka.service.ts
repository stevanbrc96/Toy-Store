import { Injectable, signal, computed } from '@angular/core';
import axios from 'axios';
import { Igracka } from '../models/igracka.model';
import { Recenzija } from '../models/recenzija.model'; 

export interface Tip { typeId: number; name: string; }
export interface Uzrast { ageGroupId: number; name: string; }

@Injectable({
  providedIn: 'root'
})
export class IgrackaService {
  private apiUrl = 'https://toy.pequla.com/api';
  // ratingsStore i recenzijeStore se koriste za simulaciju ocena
  private ratingsStore = new Map<number, number>();
  private recenzijeStore = new Map<number, Recenzija[]>([
    [1, [
      { autor: 'Marko Marković', ocena: 5, komentar: 'Sjajan auto, dete ga obožava! Kvalitetna izrada.' },
      { autor: 'Jelena Jovanović', ocena: 4, komentar: 'Veoma zabavan, ali baterije se brzo troše.' }
    ]],
    [5, [
      { autor: 'Ana Petrović', ocena: 5, komentar: 'Prelepa lutka, haljina je divno urađena. Preporuka!' }
    ]]
  ]);

  public sveIgracke = signal<Igracka[]>([]);
  public tipovi = signal<Tip[]>([]);
  public uzrasti = signal<Uzrast[]>([]);
  
  // SIGNALI ZA PRETRAGU
  public recenzijeOsvezene = signal(0);
  public searchTerm = signal('');
  public selectedType = signal(0);
  public selectedAgeGroup = signal(0);
  public selectedTargetGroup = signal('svi');
  
  // SIGNALI ZA NAPREDNO FILTRIRANJE
  public maxPrice = signal(10000);
  public minRating = signal(0);
  public sortBy = signal('default');
  public maxDate = signal<string>(''); 
  public minPrice = signal(0);          
  public searchDescription = signal(''); 

  public maxPossiblePrice = computed(() => {
    const igracke = this.sveIgracke();
    if (igracke.length === 0) return 10000;
    return Math.max(...igracke.map(i => i.price));
  });

  public filtriraneIgracke = computed(() => {
    const termin = this.searchTerm().toLowerCase();
    const tipId = this.selectedType();
    const uzrastId = this.selectedAgeGroup();
    const grupa = this.selectedTargetGroup();
    const maxCena = this.maxPrice();
    const minCena = this.minPrice();
    const minOcena = this.minRating();
    const maxDatumProizvodnje = this.maxDate(); 
    const opisTermin = this.searchDescription().toLowerCase(); 
    const sortiranje = this.sortBy();

    let filtrirano = this.sveIgracke().filter(igracka => {
      const poNazivu = igracka.name.toLowerCase().includes(termin);
      const poTipu = tipId === 0 || igracka.type.typeId === tipId;
      const poUzrastu = uzrastId === 0 || igracka.ageGroup.ageGroupId === uzrastId;
      const poCiljnojGrupi = grupa === 'svi' || igracka.targetGroup === grupa;
      const poOceni = (igracka.rating || 0) >= minOcena;
      
      // LOGIKA NOVIH FILTERA
      const poOpisu = igracka.description.toLowerCase().includes(opisTermin);
      const poCeniRaspon = igracka.price <= maxCena && igracka.price >= minCena;
      let poDatumu = true;
      if (maxDatumProizvodnje) {
          const datumIgracke = new Date(igracka.productionDate);
          const maxDozvoljeniDatum = new Date(maxDatumProizvodnje);
          poDatumu = datumIgracke.getTime() <= maxDozvoljeniDatum.getTime();
      }
      
      return poNazivu && poTipu && poUzrastu && poCiljnojGrupi && poOceni && poOpisu && poCeniRaspon && poDatumu;
    });

    if (sortiranje === 'price-asc') {
      filtrirano.sort((a, b) => a.price - b.price);
    } else if (sortiranje === 'price-desc') {
      filtrirano.sort((a, b) => b.price - a.price);
    } else if (sortiranje === 'date-newest') {
      filtrirano.sort((a, b) => new Date(b.productionDate).getTime() - new Date(a.productionDate).getTime());
    }

    return filtrirano;
  });

  constructor() {
    this.loadInitialData();
  }

  // UKLONJENA JE OBRADA SLIKE IZ SERVISA!
  private async loadInitialData(): Promise<void> {
    try {
      const igrackeRes = await axios.get<Igracka[]>(`${this.apiUrl}/toy`);
      const igrackeIzApi = igrackeRes.data;
      
      // Ne vršimo obradu slika ovde. To radi ImageUtils u HomeComponent.
      let igrackeZaObradu = igrackeIzApi;

      if (this.ratingsStore.size === 0) {
        igrackeZaObradu.forEach(igracka => {
          const randomRating = Math.random() * (5.0 - 3.5) + 3.5;
          this.ratingsStore.set(igracka.toyId, parseFloat(randomRating.toFixed(1)));
        });
      }

      const igrackeSaOcenama = igrackeZaObradu.map(igracka => ({
        ...igracka,
        rating: this.ratingsStore.get(igracka.toyId) || 0
      }));

      this.sveIgracke.set(igrackeSaOcenama);
      this.maxPrice.set(this.maxPossiblePrice());

      const [tipoviRes, uzrastiRes] = await Promise.all([
        axios.get<Tip[]>(`${this.apiUrl}/type`),
        axios.get<Uzrast[]>(`${this.apiUrl}/age-group`)
      ]);
      this.tipovi.set(tipoviRes.data);
      this.uzrasti.set(uzrastiRes.data);
    } catch (error) {
      console.error("Greška pri učitavanju inicijalnih podataka:", error);
    }
  }

  public oceniIgracku(toyId: number, ocena: number): void {
    this.ratingsStore.set(toyId, ocena);
    this.sveIgracke.update(trenutneIgracke => {
      return trenutneIgracke.map(igracka => {
        if (igracka.toyId === toyId) {
          return { ...igracka, rating: ocena };
        }
        return igracka;
      });
    });
    console.log(`Igračka sa ID ${toyId} je dobila novu ocenu: ${ocena}`);
  }
  
  public dodajRecenziju(toyId: number, ocena: number, komentar: string): void {
    const novaRecenzija: Recenzija = {
        autor: 'Korisnik (Novo)',
        ocena: ocena,
        komentar: komentar
        
    };

    const trenutneRecenzije = this.recenzijeStore.get(toyId) || [];
    this.recenzijeStore.set(toyId, [novaRecenzija, ...trenutneRecenzije]);

    this.oceniIgracku(toyId, ocena);

    console.log(`Nova recenzija dodata za ID ${toyId}.`);
    this.recenzijeOsvezene.update(v => v + 1);

  }
  
  async getIgrackaById(id: string | number): Promise<Igracka | null> {
    try {
      const response = await axios.get<Igracka>(`${this.apiUrl}/toy/${id}`);
      let igracka = response.data;
      
      if (igracka) {
        igracka.rating = this.ratingsStore.get(igracka.toyId) || 0;
      }
      return igracka;
    } catch (error) {
      console.error(`Greška prilikom dohvatanja igračke sa ID-jem ${id}:`, error);
      return null; 
    }
  }

  public getRecenzijeZaIgracku(toyId: number): Recenzija[] {
    return this.recenzijeStore.get(toyId) || [];
  }
}