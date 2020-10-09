import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private afAuth: AngularFireAuth) {
  }

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.afAuth.idTokenResult.pipe(
      map(token => {
        if (this.auth.isLoggedIn && token && token.claims.role === 'admin') {
          this.auth.clearError();
          return true;
        } else {
          this.auth.logout();
          this.auth.error$.next('You don\'t have permissions to log in');
          this.auth.loading$.next(false);
        }
      })
    );
  }
}
