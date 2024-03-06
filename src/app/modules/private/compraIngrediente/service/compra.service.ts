import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompraIngrediente } from '../models/compra-ingrediente';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http:HttpClient) { }

  adicionarCompraIngrediente(compraIngrediente : CompraIngrediente ) : any
  {
    var url = environment.urlApi+'/CompraIngrediente/AdicionarCompraIngrediente';

    var props =
    {
      "id":compraIngrediente.id,
      "ingredienteId":compraIngrediente.ingredienteId,
      "quantidade":compraIngrediente.quantidade,
      "unidadeMedidaId":compraIngrediente.unidadeMedidaId,
      "valor":compraIngrediente.valor,
      "dataCadastro":compraIngrediente.dataCadastro,
    };

    return this.http.post(url,props);
  }

  editarCompraIngrediente(compraIngrediente : CompraIngrediente ) : any
  {
    var url = environment.urlApi+'/CompraIngrediente/EditarCompraIngrediente';

    var props =
    {
      "id":compraIngrediente.id,
      "ingredienteId":compraIngrediente.ingredienteId,
      "quantidade":compraIngrediente.quantidade,
      "unidadeMedidaId":compraIngrediente.unidadeMedidaId,
      "valor":compraIngrediente.valor,
      "dataCadastro":compraIngrediente.dataCadastro,
    };

    return this.http.post(url,props);
  }

  excluirCompraIngrediente(id:number):any {
    var url = environment.urlApi+ `/CompraIngrediente/RemoverCompraIngrediente/${id}`;

    return this.http.delete(url);
  }

  obterListaCompraIngredientes() : any {
    var url = environment.urlApi+'/CompraIngrediente/ObterListaCompraIngredientes';

    return this.http.get(url);
  }

  obterCompraIngrediente(id:number) : any {
    var url = environment.urlApi+`/CompraIngrediente/ObterCompraIngrediente/${id}`;

    return this.http.get(url);
  }
}
