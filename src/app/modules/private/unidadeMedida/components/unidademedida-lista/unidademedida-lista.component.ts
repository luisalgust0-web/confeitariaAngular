import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UnidademedidaService } from '../../service/unidademedida.service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UnidadeMedida } from '../../models/unidade-medida';

@Component({
  selector: 'app-unidademedida-lista',
  templateUrl: './unidademedida-lista.component.html',
  styleUrls: ['./unidademedida-lista.component.scss']
})
export class UnidademedidalistaComponent implements OnInit {

  unidadeMedidas = [] as UnidadeMedida[];

  constructor(
  private service: UnidademedidaService, 
  private router: Router,
  private changedetect: ChangeDetectorRef,
  private confirmationService : ConfirmationService,
  private messageService: MessageService
  ){}

  ngOnInit(): void {
     this.obterListaUnidadeMedida();
  }

  obterListaUnidadeMedida(){
    this.service.obterListaUnidadeMedida().subscribe((unidadeMedidas : UnidadeMedida[]) => {
      this.unidadeMedidas = unidadeMedidas;
    });
  }

  inserirUnidadeMedida(){
    this.router.navigate(['UnidadeMedida/inserir']);
  }

  editarUnidadeMedida(unidadeMedidaId: number){
    this.router.navigate([`UnidadeMedida/editar/${unidadeMedidaId}`]);
  }

  excluirUnidadeMedidaConfirm(unidadeMedidaId: number){
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.excluirUnidadeMedida(unidadeMedidaId);
      },
      reject: (type: any) => {
      },
    });
  }

  excluirUnidadeMedida(unidadeMedidaId: number){
    this.service.excluirUnidadeMedida(unidadeMedidaId).subscribe( (resp : any) => {
      this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
      this.obterListaUnidadeMedida();
    });
  }
  
}
