import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agencia, Contribuinte } from './cfi/models';
import { Paginador } from './models/paginador';
import { JsonResponse } from './models/MessageResult';

@Injectable({
  providedIn: 'root'
})
export class CfiService {
  

  constructor(private http:HttpClient) { }


  getCadastrosFiscais(parametros: any):Observable<Contribuinte[]>{
    let url = `${environment.urlApi}/cfi/Pesquisar`;

    return this.http.post<Contribuinte[]>(url, parametros);
  }

  
  pesquisar(parametros: { documento: string | null; inscricao: string | null; }) {
    let url = `${environment.urlApi}/cfi/Pesquisar`;

    return this.http.post<Contribuinte[]>(url, parametros);
  }

}
