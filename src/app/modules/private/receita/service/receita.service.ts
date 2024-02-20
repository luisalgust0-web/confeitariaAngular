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

  public obterListaReceitas() :any {
    var url = environment.urlApi+'/Receita/CarregarListaReceitas';
    return this.http.get(url);
  }

  public obterReceita(id: number) :any {
    var url = environment.urlApi+`/Receita/CarregarReceita/${id}`

    return this.http.get(url);
  }

  public enviarReceita(id:any, nome:any, modoPreparo:any, dataCadastro:any, file : any):any {
    var url = environment.urlApi+'/Receita/EnviarReceita';

    var formData : FormData = new FormData();
    formData.append("Id", id);
    formData.append("Nome", nome);
    formData.append("ModoPreparo", modoPreparo);
    formData.append("DataCadastro", dataCadastro );
    formData.append("ImagemFile", file);


    return this.http.post(url,formData);
  }

  public excluirReceita(id:number):any {
    var url = environment.urlApi+`/Receita/ExcluirReceita/${id}`;

    return this.http.delete(url);
  }

  obterReport(parametros:any) {
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

      return this.http.get(url)
  }
}
