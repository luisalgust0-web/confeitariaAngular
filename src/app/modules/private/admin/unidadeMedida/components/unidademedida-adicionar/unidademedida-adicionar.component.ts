import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnidademedidaService } from '../../service/unidademedida.service';

@Component({
  selector: 'app-unidademedida-adicionar',
  templateUrl: './unidademedida-adicionar.component.html',
  styleUrls: ['./unidademedida-adicionar.component.scss']
})
export class UnidademedidaAdicionarComponent implements OnInit {

  alert=false;

  id=0;
  nome:string|null = null;
  sigla:string|null = null;
  dataCadastro:Date|null = null;

  constructor(private service:UnidademedidaService ) { }

  @Output()
  onClose = new EventEmitter();

  ngOnInit(): void {
  }

  novo(){
    this.dataCadastro = new Date ();
  }

  enviar() {
    this.service.enviar(this.nome,this.sigla,this.id,this.dataCadastro).subscribe();
    this.alert = true;
    console.log(this.nome);
    console.log(this.sigla);
    console.log(this.dataCadastro);      
    this.onClose.emit();
  }

  atualizar(item:any){
    this.nome= item.nome;
    this.sigla= item.sigla;
    this.dataCadastro= item.dataCadastro;
    this.id= item.id;
    console.log(item);
  }

  voltar(){
    this.onClose.emit();
  }
}
