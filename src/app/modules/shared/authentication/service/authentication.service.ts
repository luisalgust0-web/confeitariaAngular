import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, retry, Subscriber } from 'rxjs';
import { MenuItem } from 'primeng/api/menuitem';
import { AutenticacaoModelView, IUser } from '../interface/interfaces';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Data, UrlSegment } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl } from '@angular/forms';

export const NOME_TOKEN: string = 'access_token2';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient, private route: ActivatedRoute, private messageService: MessageService, private sanitizer: DomSanitizer) {
  }

  
  estaAutenticado():boolean {

    var autInString = sessionStorage.getItem(NOME_TOKEN);

    if(!autInString) return false;

     var token = JSON.parse(autInString);

     if(!token.hora){
       return false;
     }

    let data : Data = new Date(token.hora);

     let dataExpiracao : Number = (Number(data) * 1000);
     let agora: Number  = Number(new Date());

     if(data <= agora){
       this.logout();
       return false;
     }

     return true;
  }

  autenticarRemoto(usuario:any, senha:any):Observable<any> {

    var url = environment.urlApi+"/Autenticacao/Autenticar";

    var props = {
      "Usuario":usuario,
      "Senha": senha
    }

    var retorno = new Observable<Boolean>((subscriber)=>{

      this.http.post(url, props).subscribe( (resp:any) => {
         if(resp){

          var autenticacaoToken = JSON.stringify(resp);
          sessionStorage.setItem(NOME_TOKEN, autenticacaoToken);

          subscriber.next(true);
        }
        else subscriber.next(false);

      });

    });

    return retorno;

  }

  private decodeToken(resp: AutenticacaoModelView) {

    //this.menuSubject.next(resp.menu as MenuItem[]);

    //var imagePath = 'data:image/jpeg;base64,' + resp.foto;

    let usr: any = {
      nome: resp.nome,
    };

  }

  logout() {
    sessionStorage.removeItem(NOME_TOKEN);
  }

  
    getMenu(){
       return [
        {label: 'Administração', routerLink:'', items:[{label: 'Receitas', routerLink: 'manter-receitas'}]},
     ] as MenuItem[];
    }


}

