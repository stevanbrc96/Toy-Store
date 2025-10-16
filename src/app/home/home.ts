import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IgrackaService } from '../../services/igracka.service';
import { Utils } from '../utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public igrackaService: IgrackaService,
    public utils: Utils,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  goToDetails(toyId: number): void {
    this.router.navigate(['/igracka', toyId]);
  }

  goToReservation(event: MouseEvent, toyId: number): void {
    event.stopPropagation();
    this.router.navigate(['/rezervisi', toyId]);
  }
}