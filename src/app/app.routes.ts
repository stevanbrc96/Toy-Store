import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ToyDetails } from './toy-details/toy-details';
// 1. Uvezite novu komponentu
import { Reservation } from './reservation/reservation'; 
//komponente za login i signup
import { Login } from './login/login';
import { Signup } from './signup/signup';
//komponenta za profil
import { Profile } from './profile/profile';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'igracka/:toyId', component: ToyDetails },
  // 2. Dodajte novu rutu za rezervaciju
  { path: 'rezervisi/:toyId', component: Reservation },
  //rute za login i signup
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  //ruta za profil
  { path: 'profile', component: Profile }
];