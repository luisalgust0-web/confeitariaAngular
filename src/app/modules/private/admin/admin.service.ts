import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public getReceita() :any {
    var url = environment.urlApi+'/Receita/BuscarLista';
    return this.http.get(url);
  }

  public enviarArquivo(file : any){
    var url = 
  }

  public enviar(id:number|null,nome:string|null,modoPreparo:string|null ,dataCadastro:Date|null):any {
    var url = environment.urlApi+'/Receita/Adicionar';

    var prop = {
      "id":id,
      "nome":nome,
      "modoPreparo":modoPreparo,
      "dataCadastro":dataCadastro,
    }
    return this.http.post(url,prop);
  }

  public excluir(id:number|null,nome:string|null,modoPreparo:string|null ,dataCadastro:Date|null):any {
    var url = environment.urlApi+'/Receita/Excluir';

    var prop = {
      "id":id,
      "nome":nome,
      "modoPreparo":modoPreparo,
      "dataCadastro":dataCadastro,
    }
    return this.http.post(url, prop);
  }

  getReport(parametros:any) {
    var url = environment.urlApi+`/Relatorio/Relatorio?ReceitaId=${parametros}`;

    var observable = this.http.get(url, {observe: 'response', responseType:'blob'})
    .subscribe(response=>{
      let fileName='Relatorio Numero Documento';
      let blob:Blob = response.body as Blob;
      let link = document.createElement('a');
      link.download = fileName;
      link.href = window.URL.createObjectURL(blob);
      link.click();
      });
  }
}
