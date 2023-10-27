import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateEmailService {

  constructor(private http:HttpClient, private fb:FormBuilder) {}

  TemplateEmail = this.fb.group({
    id : this.fb.control<number>(0),
    nome : this.fb.control<string>(""),
    titulo : this.fb.control<string>(""),
    conteudo : this.fb.control<string>(""),
    dataCadastro : this.fb.control<Date>(new Date())
  })

  public getLista():any {
    var url = environment.urlApi+'/TemplateEmail/ListaTemplate';

    return this.http.get(url);
  }

  public adicionar(id : number|null,nome : string|null,titulo : string|null, conteudo : string|null,dataCadastro : Date|null){
    var url = environment.urlApi+'/TemplateEmail/AdicionarTemplate';

    var props ={
      "id":id,
      "nome":nome,
      "titulo":titulo,
      "conteudo":conteudo,
      "dataCadastro":dataCadastro
    }

    return this.http.post(url,props)
  }
}