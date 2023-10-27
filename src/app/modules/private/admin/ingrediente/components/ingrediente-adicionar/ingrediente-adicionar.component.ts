import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredienteService } from '../../service/ingrediente.service';

@Component({
  selector: 'app-ingrediente-adicionar',
  templateUrl: './ingrediente-adicionar.component.html',
  styleUrls: ['./ingrediente-adicionar.component.scss']
})
export class IngredienteAdicionarComponent implements OnInit {

  alert = false;

  id=0;
  nome:string|null=null;
  dataCadastro:Date|null=null;

  constructor(private service:IngredienteService) { }

  @Output()
  onClose= new EventEmitter();

  ngOnInit(): void {
  }

  novo(){
    this.dataCadastro = new Date();
  }

  enviar() { 
    this.service.enviar(this.id,this.nome,this.dataCadastro).subscribe();
    this.alert = true;
    this.onClose.emit();
  }

  atualizar(item:any){
    this.id = item.id;
    this.nome = item.nome;
    this.dataCadastro = item.dataCadastro;
  }

  voltar(){
    this.onClose.emit();
  }
}
