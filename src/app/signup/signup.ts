import { Component, signal } from '@angular/core';
import { FavoriteToysService } from '../../services/favorite-toys.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {
  protected favoriteToys = signal<string[]>([]);

  constructor() {
    FavoriteToysService.getFavoriteToys()
    .then(response => this.favoriteToys.set(response.data))
  }
}
