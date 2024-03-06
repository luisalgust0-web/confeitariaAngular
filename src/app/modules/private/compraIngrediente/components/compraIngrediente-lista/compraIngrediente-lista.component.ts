import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../service/compra.service';
import { CompraIngrediente } from '../../models/compra-ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-compraIngrediente-lista',
  templateUrl: './compraIngrediente-lista.component.html',
  styleUrls: ['./compraIngrediente-lista.component.scss']
})
export class CompraIngredienteListaComponent implements OnInit {

  compraIngredientes = [] as CompraIngrediente[];

  constructor(
    public service: CompraService,
    public router: Router,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.obterListaCompraIngrediente();

  }

  obterListaCompraIngrediente() {
    this.service.obterListaCompraIngredientes().subscribe((compraIngredientes: CompraIngrediente[]) => {
      this.compraIngredientes = compraIngredientes;
    })
  }

  inserirCompraIngrediente() {
    this.router.navigate(["CompraIngrediente/inserir"])
  }

  editarCompraIngrediente(compraIngredientId: number) {
    this.router.navigate([`CompraIngrediente/editar/${compraIngredientId}`])
  }

  excluirCompraIngredienteConfirm(compraIngredienteId: number) {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.excluitCompraIngrediente(compraIngredienteId);
      },
      reject: (type: any) => {
      },
    });
  }

  excluitCompraIngrediente(compraIngredienteId: number) {
    this.service.excluirCompraIngrediente(compraIngredienteId).subscribe(() => {
    });
  }
}
