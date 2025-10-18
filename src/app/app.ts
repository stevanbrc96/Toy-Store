import { Component, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './layout/top-bar/top-bar';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  // ✅ 1. Deklarišemo properti bez inicijalne vrednosti.
  protected currentUser: WritableSignal<UserModel | null>;

  // "Ubrizgavamo" UserService u konstruktor
  constructor(private userService: UserService) {
    // ✅ 2. Dodeljujemo vrednost NAKON što je 'userService' postao dostupan.
    this.currentUser = this.userService.currentUser;
  }
}