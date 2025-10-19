import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IgrackaService } from '../../services/igracka.service';
import * as bootstrap from 'bootstrap';

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

  ocena = signal(0);
  komentar = signal('');

  modal!: bootstrap.Modal;

  ngAfterViewInit(): void {
    const modalEl = document.getElementById('ratingModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
    }
  }

  otvori(): void {
    this.ocena.set(0);
    this.komentar.set('');
    if (this.modal) this.modal.show();
  }

  zatvori(): void {
    if (this.modal) this.modal.hide();
  }

  postaviOcenu(vrednost: number): void {
    this.ocena.set(vrednost);
  }

  sacuvaj(): void {
    if (this.ocena() === 0) {
      alert('Molimo vas da odaberete ocenu.');
      return;
    }

    this.igrackaService.dodajRecenziju(this.toyId, this.ocena(), this.komentar());
    this.recenzijaDodata.emit();

    alert('Hvala na vašoj recenziji!');
    this.zatvori();
  }
}
