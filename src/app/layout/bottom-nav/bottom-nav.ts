import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../services/user.service'; // Uvozimo UserService

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrls: ['./bottom-nav.scss']
})
export class BottomNavComponent {
  constructor(public userService: UserService) {} 
}