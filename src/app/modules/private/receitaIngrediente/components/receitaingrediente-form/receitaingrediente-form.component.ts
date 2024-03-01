
import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { AdminService } from '../../../receita/service/receita.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-receitaingrediente-form',
  templateUrl: './receitaingrediente-form.component.html',
  styleUrls: ['./receitaingrediente-form.component.scss']
})
export class ReceitaingredienteFormComponent implements OnInit {

  alert = false;

  id :number | null= null;
  ingredienteId:number|null=null;
  quantidade:number|null=null;
  unidadeMedidaId:number|null=null;
  dataCadastro:Date|null=null;

  receita : any = {};
  unidadeMedidaItens=[] as any[];
  ingredienteItens=[] as any[];

  constructor(
    private service:ReceitaIngredienteService,
    private serviceUnidadeMedida:UnidademedidaService,
    private serviceIngrediente:IngredienteService,
    private serviceReceita:AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {

    this.dataCadastro = new Date();

    const routeParams = this.route.snapshot.paramMap;
    const receitaId = routeParams.get('receitaId') ? Number(routeParams.get('receitaId')) : null;
    this.id = routeParams.get('id') ? Number(routeParams.get('id')) : null;

    if(this.id != null){
        this.service.obterReceitaIngrediente(this.id).subscribe( (receitaIngrediente : any) =>{
          this.definirReceitaIngredienteValue(receitaIngrediente);
        })
    }else this.id = 0;
  

    this.serviceUnidadeMedida.obterListaUnidadeMedida().subscribe((UnidadeMedidas : any[]) => {
      this.unidadeMedidaItens = UnidadeMedidas;
    });

    this.serviceIngrediente.obterListaIngredientes().subscribe((ingredientes : any[]) => {
      this.ingredienteItens = ingredientes;
    });

    this.serviceReceita.obterReceita(receitaId!).subscribe( (receita : any) => {
      this.receita = receita;
    } )

  }

  enviarReceitaIngrediente(){
    console.log(this.id);
      this.service.enviarReceitaIngrediente(this.id, this.receita.id, this.ingredienteId, this.quantidade, this.unidadeMedidaId, this.dataCadastro).subscribe( (receitaIngrediente : any) =>{
        this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
        this.router.navigateByUrl(`Receita/ReceitaIngrediente/${receitaIngrediente.receitaId}/editar/${receitaIngrediente.id}`);
      } );
      
  }

  definirReceitaIngredienteValue(receitaIngrediente:any){
    this.id = receitaIngrediente.id;
    this.receita.id = receitaIngrediente.id;
    this.ingredienteId = receitaIngrediente.ingredienteId;
    this.quantidade = receitaIngrediente.quantidade;
    this.unidadeMedidaId = receitaIngrediente.unidadeMedidaId
  }

  voltar(){
    this.router.navigateByUrl(`Receita/ReceitaIngrediente/${this.receita.id}`);
  }
}
