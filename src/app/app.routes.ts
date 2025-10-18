import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ToyDetails } from './toy-details/toy-details';
import { Reservation } from './reservation/reservation';
import { Login } from './login/login';
//import { Registration } from './registration/registration'; // Ostalo za koleginicu
import { Profile } from './profile/profile';
import { Signup } from './signup/signup';
// import { About } from './about/about';
// import { Cart } from './cart/cart'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'igracka/:toyId', component: ToyDetails },
  { path: 'rezervisi/:toyId', component: Reservation },
  
  { path: 'login', component: Login },
  { path: 'registracija', component: Signup },
  { path: 'profil', component: Profile },
  // { path: 'about', component: About },
  // { path: 'korpa', component: Cart },

  { path: '**', redirectTo: '' }
];
