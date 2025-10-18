import { Component, signal } from '@angular/core';
import { FavoriteToysService } from '../../services/favorite-toys.service';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  protected favoriteToys = signal<string[]>([]);

  constructor() {
    FavoriteToysService.getFavoriteToys()
    .then(response => this.favoriteToys.set(response.data))
  }
}
