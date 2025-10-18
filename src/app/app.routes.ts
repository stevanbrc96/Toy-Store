import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ToyDetails } from './toy-details/toy-details';
import { Reservation } from './reservation/reservation';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Signup } from './signup/signup';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'igracka/:toyId', component: ToyDetails },
  { path: 'rezervisi/:toyId', component: Reservation },
  
  { path: 'prijava', component: Login },
  { path: 'registracija', component: Signup },
  { path: 'profil', component: Profile },
  
  { path: 'signup', component: Signup }
];