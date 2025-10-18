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
  protected currentUser: WritableSignal<UserModel | null>;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser;
  }
}