import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private Http:HttpClient) { }

  enviar(id:number|null,ingredienteId:number|null,unidadeMedidaId:number|null,quantidade:number|null,dataCompra:Date|null,valor:number|null):any
  {
    var url = environment.urlApi+'/Compra/AdicionarCompra';

    var props =
    {
      "id":id,
      "ingredienteId":ingredienteId,
      "unidadeMedidaId":unidadeMedidaId,
      "quantidade":quantidade,
      "dataCompra":dataCompra,
      "valor":valor
    };

    return this.Http.post(url,props);
  }

  excluir(id:number|null,ingredienteId:number|null,unidadeMedidaId:number|null,quantidade:number|null,dataCompra:Date|null,valor:number|null):any
  {
    var url = environment.urlApi+'/Compra/RemoverCompra';

    var props =
    {
      "id":id,
      "ingredienteId":ingredienteId,
      "unidadeMedidaId":unidadeMedidaId,
      "quantidade":quantidade,
      "dataCompra":dataCompra,
      "valor":valor,
    };

    return this.Http.post(url,props);
  }

  getLista():any{
    var url = environment.urlApi+'/Compra/ListaComrpa';

    return this.Http.get(url);
  }
}
