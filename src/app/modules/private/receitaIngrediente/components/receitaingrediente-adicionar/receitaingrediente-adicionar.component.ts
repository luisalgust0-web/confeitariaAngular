
import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { AdminService } from '../../../receita/service/receita.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { ReceitaingredienteListaComponent } from '../receitaingrediente-lista/receitaingrediente-lista.component';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';

@Component({
  selector: 'app-receitaingrediente-adicionar',
  templateUrl: './receitaingrediente-adicionar.component.html',
  styleUrls: ['./receitaingrediente-adicionar.component.scss']
})
export class ReceitaingredienteAdicionarComponent implements OnInit {

  alert = false;
  nomeDesabilitado = false;
  id=0;
  unidadeMedidaId:number|null=null;
  ingredienteId:number|null=null;
  receitaId:number|null=null;
  quantidade:number|null=null;
  receitaNome:string|null=null;
  dataCadastro:Date|null=null;

  receitaItem : any;

  itens=[] as any[];
  unidadeItens=[] as any[];
  receitaItens=[] as any[];
  ingredienteItens=[] as any[];



  constructor(private service:ReceitaIngredienteService, private serviceUnidade:UnidademedidaService,private serviceIngrediente:IngredienteService,private serviceReceita:AdminService ) { }

  @Output()
  onClose = new EventEmitter();

  ngOnInit(): void {
    this.serviceUnidade.getLista().subscribe((itens : any[]) => {
      this.unidadeItens = itens;
    }),
    this.serviceIngrediente.obterListaIngredientes().subscribe((itens : any[]) => {
      this.ingredienteItens = itens;
    })
    this.serviceReceita.obterListaReceitas().subscribe((itens : any[]) =>{
      this.receitaItens = itens;
    });
    this.service.getLista().subscribe((itens : any[]) =>{
      this.itens = itens;
    });

  }

  novo(){
    this.dataCadastro = new Date();
  }

  iniciar(receita : any){
    this.receitaItem = receita;
  }

  enviar(){
      this.service.enviar(this.id,this.unidadeMedidaId,this.receitaId,this.ingredienteId,this.quantidade,this.dataCadastro).subscribe();
      this.alert=true;
      this.onClose.emit();
      
  }

  atualizar(item:any){
      this.id = item.id;
      this.ingredienteId = item.ingredienteId;
      this.unidadeMedidaId = item.unidadeMedidaId;
      this.receitaId = item.receitaId;
      this.quantidade = item.quantidade;
      this.dataCadastro = item.dataCadastro;
      console.log(item);
  }

  voltar(){
    this.onClose.emit();
  }
}
