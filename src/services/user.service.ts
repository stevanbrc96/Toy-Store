import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private STORAGE_USERS = 'users';
  private STORAGE_CURRENT = 'current_user';

  users = signal<UserModel[]>([]);
  currentUser = signal<UserModel | null>(null);

  constructor(private router: Router) {
    this.ucitajIzLocalStorage();
  }

  private ucitajIzLocalStorage(): void {
    const korisnici = localStorage.getItem(this.STORAGE_USERS);
    const aktivni = localStorage.getItem(this.STORAGE_CURRENT);

    this.users.set(korisnici ? JSON.parse(korisnici) : []);
    this.currentUser.set(aktivni ? JSON.parse(aktivni) : null);
  }

  private sacuvajKorisnike(): void {
    localStorage.setItem(this.STORAGE_USERS, JSON.stringify(this.users()));
  }

  private sacuvajTrenutnog(): void {
    if (this.currentUser()) {
      localStorage.setItem(this.STORAGE_CURRENT, JSON.stringify(this.currentUser()));
    } else {
      localStorage.removeItem(this.STORAGE_CURRENT);
    }
  }

  register(korisnik: UserModel): boolean {
    const postoji = this.users().some(u => u.email === korisnik.email);
    if (postoji) return false;

    const noviId = this.users().length + 1;
    const novi = { ...korisnik, id: noviId };

    this.users.update(lista => [...lista, novi]);
    this.sacuvajKorisnike();
    return true;
  }

  login(email: string, password: string): boolean {
    const korisnik = this.users().find(u => u.email === email && u.password === password);
    if (!korisnik) return false;

    this.currentUser.set(korisnik);
    this.sacuvajTrenutnog();
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    this.sacuvajTrenutnog();
    this.router.navigateByUrl('/');
  }

  updateProfile(podaci: Partial<UserModel>): void {
    const trenutni = this.currentUser();
    if (!trenutni) return;

    const azuriran = { ...trenutni, ...podaci };
    this.currentUser.set(azuriran);
    this.users.update(lista =>
      lista.map(u => (u.id === azuriran.id ? azuriran : u))
    );

    this.sacuvajKorisnike();
    this.sacuvajTrenutnog();
  }
}
