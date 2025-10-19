import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class Details{

  tehnologije = [
    { ime: 'Angular 20', ikonica: 'fa-brands fa-angular' },
    { ime: 'Bootstrap 5.3', ikonica: 'fa-brands fa-bootstrap' },
    { ime: 'Fonts Awesome 7', ikonica: 'fa-solid fa-font-awesome' },
    { ime: 'TypeScript', ikonica: 'fa-brands fa-js' }, 
    { ime: 'Toys API', ikonica: 'fa-solid fa-database' }
  ];

}