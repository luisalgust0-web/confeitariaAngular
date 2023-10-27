import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RotinaDisparoService {

  constructor(private http:HttpClient) { }

  public Enviar (id : number|null,nome : string|null,intervalo : Date|null,tipoIntervalo : any,dataCadastro : Date|null){
      var url = environment.urlApi+'/RotinaDisparo/AdicionaRotina';

      var props = {
        "id":id,
        "nome":nome,
        "intervalo":intervalo,
        "tipoIntervalo":tipoIntervalo,
        "dataCadastro":dataCadastro
      }

      return this.http.post(url,props)
  }
}
