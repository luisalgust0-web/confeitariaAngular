import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../../service/receita.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Receita } from '../../models/receita';


@Component({
  selector: 'app-receita-lista',
  templateUrl: './receita-lista.component.html',
  styleUrls: ['./receita-lista.component.scss']
})
export class ReceitaListaComponent implements OnInit {

  receitas = [] as Receita[];

  constructor(
    public service:AdminService,
    private changedetect:ChangeDetectorRef,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.obterListaReceitas();
  }

  obterListaReceitas() {
    this.service.obterListaReceitas().subscribe((receitas: Receita[]) => {
      this.receitas = receitas;
    });
  }

  inserirReceita() {
    this.router.navigate(['Receita/inserir'])
  }

  adicionarReceitaIngrediente(receitaId: number) {
    this.router.navigate([`Receita/ReceitaIngrediente/${receitaId}`])
  }

  editarReceita(receitaId:number) {
    this.router.navigate([`Receita/editar/${receitaId}`])
  }

  excluirReceitaConfirm(receitaId: number) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.excluirReceita(receitaId);
      },
      reject: (type: any) => {
      },
    });
  }

  excluirReceita(receitaId : number){
    this.service.excluirReceita(receitaId).subscribe(( resp: any ) => {
      this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
      this.obterListaReceitas();
    });
  }


  relatorio(item: any) {
    this.service.obterReport(item.id).subscribe( (resp:any) => {
      
    });
  }
}
