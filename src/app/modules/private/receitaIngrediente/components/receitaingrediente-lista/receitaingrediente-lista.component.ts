import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-receitaingrediente-lista',
  templateUrl: './receitaingrediente-lista.component.html',
  styleUrls: ['./receitaingrediente-lista.component.scss']
})
export class ReceitaingredienteListaComponent implements OnInit {

  receitaIngrediente= [] as any[];

  id=0;
  unidadeMedidaId:number|null=null;
  ingredienteId:number|null=null;
  receitaId:number|null=null;
  quantidade:number|null=null;
  dataCadastro:Date|null=null;

  constructor(
    private service:ReceitaIngredienteService,
    private changedetect:ChangeDetectorRef,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
   ) { }

  ngOnInit(): void {  
    const routeParams = this.route.snapshot.paramMap;
    this.receitaId = routeParams.get('receitaId') ? Number(routeParams.get('receitaId')) : null;

    this.obterListaReceitaIngrediente(this.receitaId);

  }

  novoCadastro(){
    this.router.navigate([`Receita/ReceitaIngrediente/${this.receitaId}/inserir`])
  }

  editarReceitaIngrediente(receitaIngredienteId:number){
    this.router.navigate([`Receita/ReceitaIngrediente/${this.receitaId}/editar/${receitaIngredienteId}`])
  }

  obterListaReceitaIngrediente(receitaId:number|null){
    this.service.obterListaReceitaIngredientePorReceitaId(receitaId).subscribe((receitaIngrediente : any[]) =>{
      this.receitaIngrediente = receitaIngrediente;
   })
  }

  excluirReceitaIngrediente(receitaIngredienteId : number){
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.service.excluirReceitaIngrediente(receitaIngredienteId).subscribe( (res:any) => {
          this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
              this.obterListaReceitaIngrediente(this.receitaId);
              this.changedetect.detectChanges();
        });
      },
      reject: (type: any) => {
      },
    });
    
  }

  fechar(){

  }
}
