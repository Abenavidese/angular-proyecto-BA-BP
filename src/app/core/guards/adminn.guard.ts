import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.authState$.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.authService.getUserRole(user.uid).pipe(
            map(role => {
              if (role === 'admin') {
                return true;
              } else {
                return this.router.createUrlTree(['/unauthorized']);
              }
            })
          );
        } else {
          return of(this.router.createUrlTree(['/login']));
        }
      })
    );
  }
}
