import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Receita } from '../../../receita/models/receita';

@Component({
  selector: 'app-receitaingrediente-lista',
  templateUrl: './receitaingrediente-lista.component.html',
  styleUrls: ['./receitaingrediente-lista.component.scss']
})
export class ReceitaingredienteListaComponent implements OnInit {

  receitaIngrediente = [] as any[];
  receita = {} as Receita;

  constructor(
    private service: ReceitaIngredienteService,
    private changedetect: ChangeDetectorRef,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obterParametrosDeRota();

    this.obterListaReceitaIngredientePorReceitaId(this.receita.id);
  }

  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;
    this.receita.id = Number(routeParams.get('receitaId'));
  }

  obterListaReceitaIngredientePorReceitaId(receitaId: number) {
    this.service.obterListaReceitaIngredientePorReceitaId(receitaId).subscribe((receitaIngrediente: any[]) => {
      this.receitaIngrediente = receitaIngrediente;
    })
  }

  inserirReceitaIngrediente() {
    this.router.navigate([`Receita/ReceitaIngrediente/${this.receita.id}/inserir`])
  }

  editarReceitaIngrediente(receitaIngredienteId: number) {
    this.router.navigate([`Receita/ReceitaIngrediente/${this.receita.id}/editar/${receitaIngredienteId}`])
  }

  excluirReceitaIngredienteConfirm(receitaIngredienteId: number) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.excluirReceitaIngrediente(receitaIngredienteId)
      },
      reject: (type: any) => {
      },
    });
  }

  excluirReceitaIngrediente(receitaIngredienteId: number) {
    this.service.excluirReceitaIngrediente(receitaIngredienteId).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.obterListaReceitaIngredientePorReceitaId(this.receita.id);
    });
  }

}
