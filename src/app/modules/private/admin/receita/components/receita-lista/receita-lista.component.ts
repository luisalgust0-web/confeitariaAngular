import { AdminService } from '../../service/receita.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ReceitaComponent } from '../receita-adicionar/receita-adicionar.component';
import { ReceitaIngredienteService } from '../../../receitaIngrediente/service/receita-ingrediente.service';
import { ReceitaingredienteAdicionarComponent } from '../../../receitaIngrediente/components/receitaingrediente-adicionar/receitaingrediente-adicionar.component';
import * as internal from 'stream';
import { ReceitaingredienteListaComponent } from '../../../receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';

@Component({
  selector: 'app-receita-lista',
  templateUrl: './receita-lista.component.html',
  styleUrls: ['./receita-lista.component.scss']
})
export class ReceitaListaComponent implements OnInit {

  confirmarExclusao=false;
  tabelaView=true;
  cadastroReceitaVisivel=false;
  receitaIngredienteCadastro=false;
  @ViewChild(ReceitaComponent)
  receitaComponente!:ReceitaComponent;
  @ViewChild(ReceitaingredienteAdicionarComponent)
  receitaIngredienteAdicionarComponente!:ReceitaingredienteAdicionarComponent;
  @ViewChild(ReceitaingredienteListaComponent)
  receitaIngredienteListaComponente!:ReceitaingredienteListaComponent;
  itens= [] as any[];

  constructor(public services:AdminService,public receitaIngredienteService:ReceitaIngredienteService,private changedetect:ChangeDetectorRef) { }

  ngOnInit(): void {

    this.services.getReceita().subscribe((itens : any[]) => {
                this.itens = itens;
    })
  }

  atualizarPagina(){
    this.tabelaView=false;
    this.cadastroReceitaVisivel=true;
    this.receitaIngredienteCadastro=true;
    this.services.getReceita().subscribe((itens : any[]) => {
      this.itens = itens;
});
    this.tabelaView=true;
    this.cadastroReceitaVisivel=false;
    this.receitaIngredienteCadastro=false;
  }

  novoCadastro(){
    this.cadastroReceitaVisivel=true;
    this.tabelaView=false;
    this.receitaIngredienteCadastro=false;
    this.changedetect.detectChanges();
    this.receitaComponente.novo();
  }

  novoIngrediente(receita : any){
    this.cadastroReceitaVisivel=false;
    this.tabelaView=false;
    this.receitaIngredienteCadastro=true;
    this.changedetect.detectChanges();
    this.receitaIngredienteAdicionarComponente.receitaId = receita.id;
    this.receitaIngredienteAdicionarComponente.iniciar(receita);
    this.receitaIngredienteListaComponente.iniciar(receita);
    console.log(receita);
  }

  selecionar(item : any) {
      this.cadastroReceitaVisivel=true;
      this.tabelaView=false;
      this.receitaIngredienteCadastro=false;
      this.changedetect.detectChanges();
      this.receitaComponente.atualizar(item);
        
    }

    excluir(item : any) {
      this.services.excluir(item.id,item.nome,item.modoPreparo,item.dataCadastro).subscribe((resp:any) => {
        this.atualizarPagina();
        this.changedetect.detectChanges();
        this.confirmarExclusao=false; 
      });
  
  }

    dialog() {
      this.confirmarExclusao=true;   
  }

    fechar(){
      this.atualizarPagina();
      this.changedetect.detectChanges();
    }

    relatorio(item : any) {
      this.services.getReport(item.id);
    }
}
