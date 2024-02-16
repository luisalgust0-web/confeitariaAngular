import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  public  enviar(Id : number ,Nome : any ,LoginNome : any , Senha : any ): any {
    var url = environment.urlApi+'/Usuario/AdicionarUsuario';

    var props = {
      "Id" : Id,
      "Nome" : Nome,
      "LoginNome" : LoginNome,
      "Senha" : Senha
    };
     
    return this.http.post(url,props);
  }
}
