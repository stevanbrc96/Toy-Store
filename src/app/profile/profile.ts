import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { WritableSignal } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  protected currentUser: WritableSignal<UserModel | null>;

  constructor(private router: Router, private userService: UserService) {
    this.currentUser = this.userService.currentUser;

    if (!this.currentUser()) {
      this.router.navigateByUrl('/prijava');
    }
  }

  logout(): void {
    this.userService.logout();
  }
}