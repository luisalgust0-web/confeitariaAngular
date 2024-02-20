import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceitaIngredienteService {
  
  constructor(private http:HttpClient) { }

  enviarReceitaIngrediente(id:number|null,unidadeMedidaId:number|null,receitaId:number|null,ingredienteId:number|null,quantidade:Number|null,dataCadastro:Date|null) {
    var url= environment.urlApi+'/ReceitaIngrediente/Adicionar';

    var props={
      "id":id,
      "unidadeMedidaId":unidadeMedidaId,
      "receitaId":receitaId,
      "ingredienteId":ingredienteId,
      "quantidade":quantidade,
      "dataCadastro":dataCadastro,
    }
    
    console.log(props);
    console.log(url);

    return this.http.post(url,props)
  }

  public excluirReceitaIngrediente(receitaIngredienteId:number|null) {
    var url = environment.urlApi+`/ReceitaIngrediente/RemoverReceitaIngrediente/${receitaIngredienteId}`;


    return this.http.delete(url);
  }

  obterListaReceitaIngredientePorReceitaId(receitaId:number|null):any{

    var url= environment.urlApi+'/ReceitaIngrediente/ObterListaPorReceita/'+receitaId;


    return this.http.get(url);
  }

}
