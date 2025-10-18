import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser = signal<UserModel | null>(null);

  // Simulirana baza korisnika
  private users: UserModel[] = [
    {
      id: 1, firstName: 'Petar', lastName: 'Petrović', email: 'petar@primer.com',
      password: 'password123', phoneNumber: '064123456', favoriteToy: 'Slagalice'
    }
  ];

  constructor(private router: Router) {
    const storedUser = sessionStorage.getItem('activeUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): void {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userToStore = { ...user };
      delete userToStore.password;

      this.currentUser.set(userToStore);
      sessionStorage.setItem('activeUser', JSON.stringify(userToStore));
      this.router.navigateByUrl('/');
    } else {
      throw new Error('Pogrešan email ili lozinka.');
    }
  }

  
  signup(payload: Omit<UserModel, 'id'>): void {
    const userExists = this.users.some(u => u.email === payload.email);
    if (userExists) {
      throw new Error('Korisnik sa ovom email adresom već postoji.');
    }

    const newUser: UserModel = {
      id: this.users.length + 1, 
      ...payload
    };
    this.users.push(newUser);
    
    console.log('Svi korisnici nakon registracije:', this.users);
  }

  logout(): void {
    this.currentUser.set(null);
    sessionStorage.removeItem('activeUser');
    this.router.navigateByUrl('/prijava');
  }
}