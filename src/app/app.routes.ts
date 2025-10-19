import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { ShoppingBasket } from './shopping-basket/shopping-basket';
import { ToyDetails } from './toy-details/toy-details';
import { Details } from './details/details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'toy/:id', component: ToyDetails },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'profil', component: Profile },
  { path: 'korpa', component: ShoppingBasket },
  { path: 'details', component: Details },
  { path: '**', redirectTo: 'home' },
];
