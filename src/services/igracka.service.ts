import { Injectable } from '@angular/core';
import axios from 'axios';
import { Igracka } from '../models/igracka.model';

// ✅ POPRAVKA: Dodat je @Injectable() dekorator.
// Ovo registruje servis u Angularu i omogućava njegovo "ubrizgavanje".
@Injectable({
  providedIn: 'root'
})
export class IgrackaService {

  private apiUrl = 'https://toy.pequla.com/api/toy';

  constructor() { }

  async getSveIgracke(): Promise<Igracka[]> {
    try {
      const response = await axios.get<Igracka[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Greška prilikom dohvatanja igračaka:', error);
      return [];
    }
  }
}