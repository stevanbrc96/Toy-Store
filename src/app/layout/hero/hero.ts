import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hero', // Ovo je "ime" komponente koje koristimo u HTML-u
  standalone: true,
  imports: [NgFor],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent {
  // ✅ Ažurirani podaci sa novim, tematskim slikama
  slides = [
    {
      // Slika sa drvenim, kreativnim igračkama
      imageUrl: '/hero-slider-1.jpg',
      title: 'Kreativne Igračke za Male Genijalce',
      subtitle: 'Podstaknite maštu i kreativnost uz našu kolekciju edukativnih setova.'
    },
    {
      imageUrl: '/hero-slider-2.jpg',
      title: 'Plišani Prijatelji Čekaju na Vas',
      subtitle: 'Najmekše plišane igračke za bezbrižne trenutke i najslađe snove.'
    },
    {
      imageUrl: '/hero-slider-3.jpg',
      title: 'Zabava na Otvorenom',
      subtitle: 'Otkrijte naš asortiman igračaka za dvorište i aktivnu igru.'
    }
  ];
}