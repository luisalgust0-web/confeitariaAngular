import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UnidadeMedida } from '../models/unidade-medida';

@Injectable({
  providedIn: 'root'
})
export class UnidademedidaService {

  constructor(private http:HttpClient) { }

  public obterListaUnidadeMedida() : any {
      var url = environment.urlApi+'/UnidadeMedida/ObterListaUnidadeMedidas';

      return this.http.get(url);
  }

  public obterUnidadeMedida(id: number) : any {
    var url = environment.urlApi+`/UnidadeMedida/ObterUnidadeMedida/${id}`;

    return this.http.get(url);
}

  public adicionarUnidadeMedida(unidadeMedida : UnidadeMedida):any {
    var url = environment.urlApi+'/UnidadeMedida/AdicionarUnidadeMedida';
    
    var props = {
      "id": unidadeMedida.id,
      "nome": unidadeMedida.nome,
      "sigla": unidadeMedida.sigla,
      "dataCadastro": unidadeMedida.dataCadastro,
    };
    
    return this.http.post(url,props);
  }

  public editarUnidadeMedida(unidadeMedida : UnidadeMedida):any {
    var url = environment.urlApi+'/UnidadeMedida/EditarUnidadeMedida';
    
    var props = {
      "id": unidadeMedida.id,
      "nome": unidadeMedida.nome,
      "sigla": unidadeMedida.sigla,
      "dataCadastro": unidadeMedida.dataCadastro,
    };
    
    return this.http.post(url,props);
  }

  public excluirUnidadeMedida(id: number|null){
    var url = environment.urlApi+`/UnidadeMedida/RemoverUnidadeMedida/${id}`;

    return this.http.delete(url);
  }
}
