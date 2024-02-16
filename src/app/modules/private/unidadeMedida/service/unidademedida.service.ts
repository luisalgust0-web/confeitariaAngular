import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidademedidaService {

  constructor(private http:HttpClient) { }

  public getLista():any{
      var url = environment.urlApi+'/UnidadeMedida/BuscarListaUnidadeMedida';
      return this.http.get(url);
  }

  public enviar(nome: string | null, sigla: string | null, id: number, dataCadastro : Date|null):any {
    var url = environment.urlApi+'/UnidadeMedida/AdicionarUnidadeMedida';
    
    var props = {
      "id": id,
      "nome": nome,
      "sigla": sigla,
      "dataCadastro": dataCadastro,
    };
    
    return this.http.post(url,props);
  }

  public excluir(id: number|null,sigla: string|null,nome: string|null){
    var url = environment.urlApi+'/UnidadeMedida/RemoverUnidadeMedida';

    var props= {
      "id": id,
      "sigla": sigla,
      "nome": nome,
    }

    return this.http.post(url,props);
  }
}
