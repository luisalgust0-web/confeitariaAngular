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
    var url = environment.urlApi+'/Receita/ObterListaReceitas';
    return this.http.get(url);
  }

  public obterReceita(id: number) :any {
    var url = environment.urlApi+`/Receita/ObterReceita/${id}`

    return this.http.get(url);
  }

  public adicionarReceita(receita : any, imagemReceita : any):any {
    var url = environment.urlApi+'/Receita/AdicionarReceita';

    var formData : FormData = new FormData();
    formData.append("Id", receita.id);
    formData.append("Nome", receita.nome);
    formData.append("ModoPreparo", receita.modoPreparo);
    formData.append("DataCadastro", receita.dataCadastro );
    formData.append("ImagemFile", imagemReceita.imageFile);


    return this.http.post(url,formData);
  }

  public editarReceita(receita : any, imagemReceita : any):any {
    var url = environment.urlApi+'/Receita/EditarReceita';

    var formData : FormData = new FormData();
    formData.append("Id", receita.id);
    formData.append("Nome", receita.nome);
    formData.append("ModoPreparo", receita.modoPreparo);
    formData.append("DataCadastro", receita.dataCadastro );
    formData.append("ImagemFile", imagemReceita.imageFile);


    return this.http.post(url,formData);
  }

  public excluirReceita(id:number):any {
    var url = environment.urlApi+`/Receita/RemoverReceita/${id}`;

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
