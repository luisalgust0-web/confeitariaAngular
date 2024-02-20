import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../../service/receita.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receita-lista',
  templateUrl: './receita-lista.component.html',
  styleUrls: ['./receita-lista.component.scss']
})
export class ReceitaListaComponent implements OnInit {

  receitas = [] as any[];

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
    this.service.obterListaReceitas().subscribe((receitas: any[]) => {
      this.receitas = receitas;
    });
  }

  novoCadastro() {
    this.router.navigate(['Receita/inserir'])
  }

  receitaIngrediente(receitaId: number) {
    this.router.navigate([`Receita/ReceitaIngrediente/${receitaId}`])
  }

  editarReceita(receitaId:number) {
    this.router.navigate([`Receita/editar/${receitaId}`])
  }

  excluirReceita(receitaId: number) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.service.excluirReceita(receitaId).subscribe(( resp: any ) => {
          this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
          this.obterListaReceitas();
          this.changedetect.detectChanges();
        });
      },
      reject: (type: any) => {
      },
    });
  }



  relatorio(item: any) {
    this.service.obterReport(item.id).subscribe( (resp:any) => {
      
    });
  }
}
