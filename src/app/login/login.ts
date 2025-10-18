import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  protected form: FormGroup

  constructor(private fb: FormBuilder, protected router: Router) {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(!this.form.valid){
      alert('Formular nije validan');
      return;
    }

    try {
      UserService.login(this.form.value.email, this.form.value.password);
      this.router.navigateByUrl('/profile');
    } catch (e) {
      alert('Check your credentials and try again.');
    }
  }
}
