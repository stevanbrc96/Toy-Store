import { Igracka } from './igracka.model';

export type StatusRezervacije = 'rezervisano' | 'pristiglo' | 'otkazano';

export interface KorpaStavka extends Igracka {
  status: StatusRezervacije;
  ocenaKorisnika?: number; 
}