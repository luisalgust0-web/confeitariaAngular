
import { Component, EventEmitter, OnInit, Output, ViewChild, } from '@angular/core';
import { AdminService } from '../../../receita/service/receita.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ReceitaIngrediente } from '../../models/receita-ingrediente';
import { Receita } from '../../../receita/models/receita';
import { UnidadeMedida } from '../../../unidadeMedida/models/unidade-medida';
import { Ingrediente } from '../../../ingrediente/models/ingrediente';

@Component({
  selector: 'app-receitaingrediente-form',
  templateUrl: './receitaingrediente-form.component.html',
  styleUrls: ['./receitaingrediente-form.component.scss']
})
export class ReceitaingredienteFormComponent implements OnInit {

  alert = false;

  receitaIngrediente: ReceitaIngrediente = { dataCadastro : new Date() } as ReceitaIngrediente;
  receita: Receita = {} as Receita;
  
  listaUnidadeMedida = [] as UnidadeMedida[];
  listaIngrediente = [] as Ingrediente[];

  constructor(
    private service: ReceitaIngredienteService,
    private serviceUnidadeMedida: UnidademedidaService,
    private serviceIngrediente: IngredienteService,
    private serviceReceita: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.obterParametrosDeRota();

    if (this.receitaIngredienteExistente()) {
      this.obterReceitaIngrediente();
    };

    this.obterListaIngrediente();
    this.obterListaUnidadeMedida();
    this.obterReceita();
  }

  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;

    this.receita.id = Number(routeParams.get('receitaId'));
    this.receitaIngrediente.id = routeParams.get('id') ? Number(routeParams.get('id')) : 0;
  }

  receitaIngredienteExistente(): boolean {
    if (this.receitaIngrediente.id != 0) {
      return true;
    }
    else return false;
  }

  obterReceitaIngrediente() {
    this.service.obterReceitaIngrediente(this.receitaIngrediente.id).subscribe((receitaIngrediente: ReceitaIngrediente) => {
      this.definirReceitaIngrediente(receitaIngrediente);
    })
  }

  definirReceitaIngrediente(receitaIngrediente: ReceitaIngrediente) {
    this.receitaIngrediente = receitaIngrediente;
  }

  obterListaUnidadeMedida(){
    this.serviceUnidadeMedida.obterListaUnidadeMedida().subscribe((UnidadeMedidas: UnidadeMedida[]) => {
      this.listaUnidadeMedida = UnidadeMedidas;
    });
  }

  obterListaIngrediente(){
    this.serviceIngrediente.obterListaIngredientes().subscribe((ingredientes: Ingrediente[]) => {
      this.listaIngrediente = ingredientes;
    });
  }

  obterReceita(){
    this.serviceReceita.obterReceita(this.receita.id).subscribe((receita: Receita) => {
      this.receita = receita;
    })
  }

  enviarReceitaIngredienteForm() {
   if(this.receitaIngredienteExistente())
  {
    this.editarReceitaIngrediente();
  }
  else
  {
    this.adicionarReceitaIngrediente();
  }
  }

  adicionarReceitaIngrediente() {
    this.service.adicioanrReceitaIngrediente(this.receitaIngrediente).subscribe((receitaIngrediente: any) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Receita/ReceitaIngrediente/${receitaIngrediente.receitaId}/editar/${receitaIngrediente.id}`);
    });
  }

  editarReceitaIngrediente() {
    this.service.editarReceitaIngrediente(this.receitaIngrediente).subscribe((receitaIngrediente: any) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Receita/ReceitaIngrediente/${receitaIngrediente.receitaId}/editar/${receitaIngrediente.id}`);
    });
  }

  voltar() {
    this.router.navigateByUrl(`Receita/ReceitaIngrediente/${this.receita.id}`);
  }
}
