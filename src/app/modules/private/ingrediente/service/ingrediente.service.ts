import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http:HttpClient) { }

  enviarIngrediente(id:number|null ,nome:string|null ,dataCadastro:Date|null):any {
    var url = environment.urlApi+'/Ingrediente/EnviarIngrediente';

    var propiedades= {
      "id": id,
      "nome":nome,
      "dataCadastro":dataCadastro
    };

    console.log(propiedades);

    return this.http.post(url,propiedades);
  }

  public obterListaIngredientes():any{
    var url = environment.urlApi+'/Ingrediente/CarregarListaIngredientes';
    return this.http.get(url);
  }

  public obterIngrediente(id:number):any{
    var url = environment.urlApi+`/Ingrediente/CarregarIngrediente/${id}`

    return this.http.get(url);

  }

  public excluirIngrediente(id:number|null):any {
    var url = environment.urlApi+ `/Ingrediente/RemoverIngrediente/${id}`;

    return this.http.delete(url);
  }
}
