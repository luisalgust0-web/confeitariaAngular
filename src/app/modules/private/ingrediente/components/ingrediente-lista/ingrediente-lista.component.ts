import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { time } from 'console';
import { IngredienteFormComponent } from '../ingrediente-form/ingrediente-form.component';
import { IngredienteService } from '../../service/ingrediente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Ingrediente } from '../../models/ingrediente';

@Component({
  selector: 'app-ingrediente-lista',
  templateUrl: './ingrediente-lista.component.html',
  styleUrls: ['./ingrediente-lista.component.scss']
})
export class IngredienteListaComponent implements OnInit {

  ingredientes = [] as Ingrediente[];

  constructor(
    public service: IngredienteService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.obterListaIngrediente();
  }

  obterListaIngrediente() {
    this.service.obterListaIngredientes().subscribe((ingredientes: Ingrediente[]) => {
      this.ingredientes = ingredientes;
    });
  }

  editarIngrediente(ingredienteId: number) {
    this.router.navigate([`Ingrediente/editar/${ingredienteId}`]);
  }

  inserirIngrediente() {
    this.router.navigate(['Ingrediente/inserir']);
  }

  excluirIngredienteConfirm(ingredienteId: number) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.excluirIngrediente(ingredienteId);
      },
      reject: (type: any) => {
      },
    });
  }

  excluirIngrediente(ingredienteId : number){
    this.service.excluirIngrediente(ingredienteId).subscribe((resp: any) => {
      this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
      this.obterListaIngrediente();
    });
  }  

}

