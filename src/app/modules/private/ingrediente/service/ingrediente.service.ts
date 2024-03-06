import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http:HttpClient) { }

  adicionarIngrediente(ingrediente : Ingrediente):any {
    var url = environment.urlApi+'/Ingrediente/AdicioanrIngrediente';

    var propiedades= {
      "id": ingrediente.id,
      "nome": ingrediente.nome,
      "dataCadastro": ingrediente.dataCadastro
    };

    console.log(propiedades);

    return this.http.post(url,propiedades);
  }

  editarIngrediente(ingrediente : Ingrediente):any {
    var url = environment.urlApi+'/Ingrediente/EditarIngrediente';

    var propiedades= {
      "id": ingrediente.id,
      "nome": ingrediente.nome,
      "dataCadastro": ingrediente.dataCadastro
    };

    console.log(propiedades);

    return this.http.post(url,propiedades);
  }

  public obterListaIngredientes():any{
    var url = environment.urlApi+'/Ingrediente/ObterListaIngredientes';
    return this.http.get(url);
  }

  public obterIngrediente(id:number):any{
    var url = environment.urlApi+`/Ingrediente/ObterIngrediente/${id}`

    return this.http.get(url);

  }

  public excluirIngrediente(id:number|null):any {
    var url = environment.urlApi+ `/Ingrediente/RemoverIngrediente/${id}`;

    return this.http.delete(url);
  }
}
