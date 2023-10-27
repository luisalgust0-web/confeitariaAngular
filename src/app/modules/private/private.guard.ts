import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './admin/authentication/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
       var autenticado = this.authService.estaAutenticado();

      if (!autenticado){
         this.router.navigate(['/login']);
      }

      return autenticado;
    
  }
  
}
