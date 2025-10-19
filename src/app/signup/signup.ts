// src/app/signup/signup.ts
import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IgrackaService } from '../../services/igracka.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private igrackaService = inject(IgrackaService);

  form: FormGroup;
  favoriteToys: string[] = [];

  constructor() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      phoneNumber: [''],
      address: [''],
      favoriteToy: ['']
    });

    // automatski reaguje kad se signal promeni
    effect(() => {
      const tipovi = this.igrackaService.tipovi();
      this.favoriteToys = Array.isArray(tipovi) ? tipovi.map(t => t.name) : [];
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const user = this.form.value;
    if (user.password !== user.repeatPassword) {
      alert('Lozinke se ne poklapaju.');
      return;
    }

    const success = this.userService.register(user);
    if (success) {
      alert('Registracija uspešna! Možete se prijaviti.');
      this.router.navigateByUrl('/login');
    } else {
      alert('Korisnik sa ovom email adresom već postoji.');
    }
  }
}
