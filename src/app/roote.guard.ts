import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './modules/private/admin/authentication/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RooteGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



      var autenticado = this.authService.estaAutenticado();

      if (!autenticado){
          this.router.navigate(['/login'])
          return false;
          //window.location.replace(environment.urlRedirectNaoAutenticado);
      }
      else
      return true;
      
  }
      //this.authService.autenticarRemoto().subscribe(resp=>{
    
  
}
