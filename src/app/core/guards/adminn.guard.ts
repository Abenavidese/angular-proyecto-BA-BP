
// Importa los módulos y funciones necesarios de Angular y RxJS
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

// Importa el servicio AuthService y los operadores de RxJS necesarios
import { AuthService } from '../services/auth.service';
import { map, switchMap, take } from 'rxjs/operators';

// Define un guardia de ruta llamado AdminGuard y lo marca como Injectable
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // Constructor del guardia de ruta AdminGuard
  constructor(private authService: AuthService, private router: Router) {}

  // Método canActivate que implementa la interfaz CanActivate
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Utiliza el observable authState$ del servicio AuthService para obtener el estado de autenticación
    return this.authService.authState$.pipe(
      // Toma el primer valor del observable para asegurar que solo se ejecute una vez
      take(1),
      // Utiliza switchMap para manejar el flujo de datos de forma asincrónica
      switchMap(user => {
        // Verifica si hay un usuario autenticado
        if (user) {
          // Si hay un usuario, utiliza el servicio AuthService para obtener su rol
          return this.authService.getUserRole(user.uid).pipe(
            // Utiliza el operador map para mapear el rol del usuario a un valor booleano o una UrlTree
            map(role => {
              // Verifica si el rol del usuario es 'admin'
              if (role === 'admin') {
                // Si el rol es 'admin', permite el acceso a la ruta protegida devolviendo true
                return true;
              } else {
                // Si el rol no es 'admin', redirige al usuario a la página de acceso no autorizado
                return this.router.createUrlTree(['/unauthorized']);
              }
            })
          );
        } else {
          // Si no hay un usuario autenticado, redirige al usuario a la página de inicio de sesión
          return of(this.router.createUrlTree(['/login']));
        }
      })
    );
  }
}
