import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TemplateEmailService } from '../../service/template-email.service';

@Component({
  selector: 'app-template-email-adicionar',
  templateUrl: './template-email-adicionar.component.html',
  styleUrls: ['./template-email-adicionar.component.scss']
})
export class TemplateEmailAdicionarComponent implements OnInit {

  constructor(private service:TemplateEmailService,private fb:FormBuilder) { }

  dataCadastro! :any;

  templateEmailGroup = this.fb.group({
    id : this.fb.control<number>(0),
    nome : this.fb.control<string>(""),
    titulo : this.fb.control<string>(""),
    conteudo : this.fb.control<string>(""),
    dataCadastro : this.fb.control<Date>(new Date())
  })

  ngOnInit(): void {
    this.dataCadastro = this.templateEmailGroup.controls.dataCadastro.value?.getDate();
  }

  Enviar(){
    this.service.adicionar(this.templateEmailGroup.controls.id.value,this.templateEmailGroup.controls.nome.value,this.templateEmailGroup.controls.titulo.value,this.templateEmailGroup.controls.conteudo.value,this.templateEmailGroup.controls.dataCadastro.value).subscribe((response : any) => {});
  }

}
