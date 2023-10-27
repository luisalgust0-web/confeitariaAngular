import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http:HttpClient) { }

  enviar(id:number|null ,nome:string|null ,dataCadastro:Date|null):any {
    var url = environment.urlApi+'/Ingrediente/AdicionarIngrediente';

    var props= {
      "id": id,
      "nome":nome,
      "dataCadastro":dataCadastro
    };

    return this.http.post(url,props);
  }

  public getLista():any{
    var url = environment.urlApi+'/Ingrediente/BuscarLista';
    return this.http.get(url);
  }

  public excluir(id:number|null ,nome:string|null ,dataCadastro:Date|null):any {
    var url = environment.urlApi+ '/Ingrediente/RemoverIngrediente';

    var props= {
      "id": id,
      "nome":nome,
      "dataCadastro":dataCadastro
    };

    return this.http.post(url,props);
  }
}
