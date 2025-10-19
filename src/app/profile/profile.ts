// src/app/profile/profile.ts
import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IgrackaService } from '../../services/igracka.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private igrackaService = inject(IgrackaService);

  form: FormGroup;
  korisnik: UserModel | null = null;
  tipovi: string[] = [];

  constructor() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phoneNumber: [''],
      address: [''],
      favoriteToy: ['']
    });

    // punimo dropdown iz IgrackaService.tipovi()
    effect(() => {
      const tipovi = this.igrackaService.tipovi();
      this.tipovi = Array.isArray(tipovi) ? tipovi.map(t => t.name) : [];
    });

    // slušamo aktivnog korisnika
    effect(() => {
      const user = this.userService.currentUser();
      if (user) {
        this.korisnik = user;
        this.form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          favoriteToy: user.favoriteToy
        });
      }
    });
  }

  sacuvaj(): void {
    if (this.form.invalid) return;
    const updated = this.form.getRawValue() as Partial<UserModel>;
    this.userService.updateProfile(updated);
    alert('Profil uspešno ažuriran!');
  }

  odjava(): void {
    this.userService.logout();
  }
}
