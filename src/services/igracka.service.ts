import { Injectable, signal, computed } from '@angular/core';
import axios from 'axios';
import { Igracka } from '../models/igracka.model';

export interface Tip { typeId: number; name: string; }
export interface Uzrast { ageGroupId: number; name: string; }

@Injectable({
  providedIn: 'root'
})
export class IgrackaService {
  private apiUrl = 'https://toy.pequla.com/api';

  private ratingsStore = new Map<number, number>();

  public sveIgracke = signal<Igracka[]>([]);
  public tipovi = signal<Tip[]>([]);
  public uzrasti = signal<Uzrast[]>([]);
  public searchTerm = signal('');
  public selectedType = signal(0);
  public selectedAgeGroup = signal(0);
  public selectedTargetGroup = signal('svi'); 

  public filtriraneIgracke = computed(() => {
    const termin = this.searchTerm().toLowerCase();
    const tipId = this.selectedType();
    const uzrastId = this.selectedAgeGroup();
    const grupa = this.selectedTargetGroup(); 

    return this.sveIgracke().filter(igracka => {
      const poNazivu = igracka.name.toLowerCase().includes(termin);
      const poTipu = tipId === 0 || igracka.type.typeId === tipId;
      const poUzrastu = uzrastId === 0 || igracka.ageGroup.ageGroupId === uzrastId;
      const poCiljnojGrupi = grupa === 'svi' || igracka.targetGroup === grupa;
      return poNazivu && poTipu && poUzrastu && poCiljnojGrupi; 
    });
  });

  constructor() {
    this.loadInitialData();
  }

  private async loadInitialData(): Promise<void> {
    try {
      const igrackeRes = await axios.get<Igracka[]>(`${this.apiUrl}/toy`);
      const igrackeIzApi = igrackeRes.data;

      if (this.ratingsStore.size === 0) {
        igrackeIzApi.forEach(igracka => {
          const randomRating = Math.random() * (5.0 - 3.5) + 3.5;
          this.ratingsStore.set(igracka.toyId, parseFloat(randomRating.toFixed(1)));
        });
      }
      
      const igrackeSaOcenama = igrackeIzApi.map(igracka => ({
        ...igracka,
        rating: this.ratingsStore.get(igracka.toyId) || 0
      }));

      this.sveIgracke.set(igrackeSaOcenama);

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

  async getIgrackaById(id: string | number): Promise<Igracka | null> {
    try {
      const response = await axios.get<Igracka>(`${this.apiUrl}/toy/${id}`);
      const igracka = response.data;
      if (igracka) {
        igracka.rating = this.ratingsStore.get(igracka.toyId) || 0;
      }
      return igracka;
    } catch (error) {
      console.error(`Greška prilikom dohvatanja igračke sa ID-jem ${id}:`, error);
      return null;
    }
  }
}

