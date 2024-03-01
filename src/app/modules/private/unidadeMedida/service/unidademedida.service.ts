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
      var url = environment.urlApi+'/UnidadeMedida/CarregarListaUnidadeMedida';

      return this.http.get(url);
  }

  public obterUnidadeMedida(id: number) : any {
    var url = environment.urlApi+`/UnidadeMedida/CarregarUnidadeMedida/${id}`;

    return this.http.get(url);
}

  public enviarUnidadeMedida(unidadeMedida : UnidadeMedida):any {
    var url = environment.urlApi+'/UnidadeMedida/EnviarUnidadeMedida';
    
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
