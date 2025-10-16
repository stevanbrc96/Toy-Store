import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ToyDetails } from './toy-details/toy-details';
// 1. Uvezite novu komponentu
import { Reservation } from './reservation/reservation'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'igracka/:toyId', component: ToyDetails },
  // 2. Dodajte novu rutu za rezervaciju
  { path: 'rezervisi/:toyId', component: Reservation }
];