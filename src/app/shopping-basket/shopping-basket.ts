import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { KorpaService } from '../../services/shopping-basket.service';
import { UserService } from '../../services/user.service';
import { StatusRezervacije } from '../../models/shopping-basket.model'; 
import { Utils } from '../utils';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './shopping-basket.html',
  styleUrls: ['./shopping-basket.scss']
})
export class Cart {
  constructor(
    public korpaService: KorpaService,
    public utils: Utils,
    private userService: UserService,
    private router: Router
  ) {
    if (!this.userService.currentUser()) {
      this.router.navigateByUrl('/prijava');
    }
  }
}