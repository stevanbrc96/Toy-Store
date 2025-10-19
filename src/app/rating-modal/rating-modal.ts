import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IgrackaService } from '../../services/igracka.service';

@Component({
  selector: 'app-rating-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-modal.html',
  styleUrls: ['./rating-modal.scss']
})
export class RatingModal {
  private igrackaService = inject(IgrackaService);

  @Input() toyId!: number;
  @Output() recenzijaDodata = new EventEmitter<void>(); 

  ocena: number = 0;
  komentar: string = '';
  prikazano: boolean = false;

  otvori(): void {
    this.prikazano = true;
    this.ocena = 0;
    this.komentar = '';
  }

  zatvori(): void {
    this.prikazano = false;
  }

  postaviOcenu(vrednost: number): void {
    this.ocena = vrednost;
  }

  sacuvaj(): void {
    if (this.ocena === 0) {
      alert('Molimo vas da odaberete ocenu.');
      return;
    }

    this.igrackaService.dodajRecenziju(this.toyId, this.ocena, this.komentar);

    // ✅ signalizuj roditelju (ToyDetails) da se recenzije osveže
    this.recenzijaDodata.emit();

    alert('Hvala na vašoj recenziji!');
    this.zatvori();
  }
}
