import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {
  protected form: FormGroup;
  // Simuliramo listu omiljenih igračaka za dropdown
  protected favoriteToys = signal<string[]>([
    'Plišane igračke',
    'Slagalice',
    'Akcione figure',
    'Lutke',
    'Automobili'
  ]);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Kreiramo reaktivnu formu sa validatorima
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      favoriteToy: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Provera da li se lozinke poklapaju
    if (this.form.value.password !== this.form.value.repeatPassword) {
      alert('Lozinke se ne poklapaju.');
      return;
    }

    if (!this.form.valid) {
      alert('Molimo Vas, popunite sva polja ispravno.');
      return;
    }

    try {
      // Sada će ovaj poziv ispravno raditi
      this.userService.signup(this.form.value);
      alert('Uspešno ste se registrovali! Sada se možete prijaviti.');
      this.router.navigateByUrl('/prijava');
    } catch (e: any) {
      alert(e.message);
    }
  }
}