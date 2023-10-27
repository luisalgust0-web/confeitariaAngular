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

  public enviar(id:any, nome:any, modoPreparo:any, dataCadastro:any, file : any):any {
    var url = environment.urlApi+'/Receita/Adicionar';

    var formData : FormData = new FormData();
    formData.append("Id", id);
    formData.append("Nome", nome);
    formData.append("ModoPreparo", modoPreparo);
    formData.append("DataCadastro", dataCadastro.toISOString() );
    formData.append("ImagemFile", file);


    return this.http.post(url,formData);
  }

  public uploadFile(){
    
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
