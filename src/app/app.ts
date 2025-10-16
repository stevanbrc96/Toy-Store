import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './layout/top-bar/top-bar';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}