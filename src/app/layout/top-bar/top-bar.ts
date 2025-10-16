import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IgrackaService } from '../../../services/igracka.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.scss']
})
export class TopBarComponent {
  constructor(
    public igrackaService: IgrackaService,
    private router: Router
  ) {}

  onSearchChange(): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }
}