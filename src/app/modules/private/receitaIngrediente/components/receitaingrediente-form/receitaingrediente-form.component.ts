
import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { AdminService } from '../../../receita/service/receita.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receitaingrediente-form',
  templateUrl: './receitaingrediente-form.component.html',
  styleUrls: ['./receitaingrediente-form.component.scss']
})
export class ReceitaingredienteFormComponent implements OnInit {

  alert = false;
  nomeDesabilitado = false;

  id=0;
  unidadeMedidaId:number|null=null;
  ingredienteId:number|null=null;
  receitaId:number|null=null;
  quantidade:number|null=null;
  dataCadastro:Date|null=null;

  receitaItem : any;

  unidadeMedidaItens=[] as any[];
  receitaItens=[] as any[];
  ingredienteItens=[] as any[];



  constructor(
    private service:ReceitaIngredienteService,
    private serviceUnidadeMedida:UnidademedidaService,
    private serviceIngrediente:IngredienteService,
    private serviceReceita:AdminService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.receitaId = routeParams.get('receitaId') ? Number(routeParams.get('receitaId')) : null;

    this.serviceUnidadeMedida.getLista().subscribe((UnidadeMedidas : any[]) => {
      this.unidadeMedidaItens = UnidadeMedidas;
    });

    this.serviceIngrediente.obterListaIngredientes().subscribe((ingredientes : any[]) => {
      this.ingredienteItens = ingredientes;
    });

    this.serviceReceita.obterListaReceitas().subscribe((receitas : any[]) =>{
      this.receitaItens = receitas;
    });


  }

  novo(){
    this.dataCadastro = new Date();
  }

  iniciar(receita : any){
    this.receitaItem = receita;
  }

  enviar(){
      this.service.enviarReceitaIngrediente(this.id,this.unidadeMedidaId,this.receitaId,this.ingredienteId,this.quantidade,this.dataCadastro).subscribe();
      
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

  }
}
