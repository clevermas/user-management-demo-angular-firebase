import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  token;

  error$ = new BehaviorSubject('');
  loading$ = new BehaviorSubject(false);

  constructor(private auth: AngularFireAuth, public router: Router) {
    auth.authState.subscribe(this.authStateHandler);
  }

  authStateHandler = async (user: User) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['']);
    }
    else {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    }
    this.user = user;
    this.token = await user.getIdToken();
  }

  async login(email: string, password: string) {
    try {
      this.loading$.next(true);
      await this.auth.signInWithEmailAndPassword(email, password);
      this.loading$.next(false);
    } catch (e) {
      this.error$.next(e.message);
      this.loading$.next(false);
    }
  }

  async logout() {
    await this.auth.signOut();
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  clearError() {
    this.error$.next('');
  }
}
