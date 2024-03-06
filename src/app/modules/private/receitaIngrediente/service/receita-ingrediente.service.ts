import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceitaIngrediente } from '../models/receita-ingrediente';

@Injectable({
  providedIn: 'root'
})
export class ReceitaIngredienteService {
  
  constructor(private http:HttpClient) { }

  adicioanrReceitaIngrediente(receitaIngrediente : ReceitaIngrediente) {
    var url= environment.urlApi+'/ReceitaIngrediente/AdicionarReceitaIngrediente';

    var props={
      "id": receitaIngrediente.id,
      "receitaId": receitaIngrediente.receitaId,
      "ingredienteId": receitaIngrediente.ingredienteId,
      "unidadeMedidaId": receitaIngrediente.unidadeMedidaId,
      "quantidade": receitaIngrediente.quantidade,
      "dataCadastro": receitaIngrediente.dataCadastro,
    }
    
    console.log(props);
    console.log(url);

    return this.http.post(url,props)
  }

  editarReceitaIngrediente(receitaIngrediente : ReceitaIngrediente) {
    var url= environment.urlApi+'/ReceitaIngrediente/EditarReceitaIngrediente';

    var props={
      "id": receitaIngrediente.id,
      "receitaId": receitaIngrediente.receitaId,
      "ingredienteId": receitaIngrediente.ingredienteId,
      "unidadeMedidaId": receitaIngrediente.unidadeMedidaId,
      "quantidade": receitaIngrediente.quantidade,
      "dataCadastro": receitaIngrediente.dataCadastro,
    }

    return this.http.post(url,props)
  }

  public excluirReceitaIngrediente(receitaIngredienteId:number|null) {
    var url = environment.urlApi+`/ReceitaIngrediente/RemoverReceitaIngrediente/${receitaIngredienteId}`;

    return this.http.delete(url);
  }

  obterListaReceitaIngredientePorReceitaId(receitaId:number):any{
    var url= environment.urlApi+'/ReceitaIngrediente/ObterListaReceitaIngredientesPorReceita/'+receitaId;


    return this.http.get(url);
  }

  obterReceitaIngrediente(receitaIngredienteId : number) : any{
    var url= environment.urlApi+`/ReceitaIngrediente/ObterReceitaIngrediente/${receitaIngredienteId}`

    return this.http.get(url);
  }
}
