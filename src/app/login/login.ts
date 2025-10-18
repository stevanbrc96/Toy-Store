import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  protected form: FormGroup

  // "Ubrizgavamo" servis
  constructor(
    private fb: FormBuilder, 
    private userService: UserService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      alert('Molimo Vas, popunite sva polja ispravno.');
      return;
    }

    try {
      // Pozivamo metodu na instanci servisa
      this.userService.login(this.form.value.email, this.form.value.password);
    } catch (e: any) {
      alert(e.message);
    }
  }
}