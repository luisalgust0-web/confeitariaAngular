import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceitaIngredienteService {
  
  constructor(private http:HttpClient) { }

  enviarReceitaIngrediente(id:number|null, receitaId:number|null, ingredienteId:number|null, quantidade:Number|null, unidadeMedidaId:number|null, dataCadastro:Date|null) {
    var url= environment.urlApi+'/ReceitaIngrediente/EnviarReceitaIngrediente';

    var props={
      "id":id,
      "receitaId":receitaId,
      "ingredienteId":ingredienteId,
      "unidadeMedidaId":unidadeMedidaId,
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

    var url= environment.urlApi+'/ReceitaIngrediente/CarregarListaReceitaIngredientesPorReceitaId/'+receitaId;


    return this.http.get(url);
  }

  obterReceitaIngrediente(receitaIngredienteId : number|null){
    var url= environment.urlApi+`/ReceitaIngrediente/CarregarReceitaIngrediente/${receitaIngredienteId}`

    return this.http.get(url);
  }
}
