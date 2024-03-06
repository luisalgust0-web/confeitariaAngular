import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CompraService } from '../../service/compra.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';
import { CompraIngrediente } from '../../models/compra-ingrediente';
import { UnidadeMedida } from '../../../unidadeMedida/models/unidade-medida';
import { Ingrediente } from '../../../ingrediente/models/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compraIngrediente-form',
  templateUrl: './compraIngrediente-form.component.html',
  styleUrls: ['./compraIngrediente-form.component.scss']
})
export class compraIngredienteFormComponent implements OnInit {

  compraIngrediente = { dataCadastro: new Date() } as CompraIngrediente;
  listaUnidadeMedidas = [] as UnidadeMedida[];
  listaIngredientes = [] as Ingrediente[];

  constructor(
    public service: CompraService,
    public unidadeService: UnidademedidaService,
    public ingredienteService: IngredienteService,
    public router: Router,
    public route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.obterParametrosDeRota();

    if (this.compraIngredienteExistente()) {
      this.obterCompraIngrediente();
    };

    this.obterListaIngrediente();
    this.obterListaUnidadeMedida();

  }


  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;

    this.compraIngrediente.id = routeParams.get('id') ? Number(routeParams.get('id')) : 0;
  };

  compraIngredienteExistente(): boolean {
    if (this.compraIngrediente.id != 0) {
      return true;
    }
    else return false
  };

  obterCompraIngrediente() {
    this.service.obterCompraIngrediente(this.compraIngrediente.id).subscribe((compraIngrediente: CompraIngrediente) => {
      this.definirCompraIngrediente(compraIngrediente);
    });
  };

  definirCompraIngrediente(compraIngrediente: CompraIngrediente) {
    this.compraIngrediente = compraIngrediente;
  };

  obterListaUnidadeMedida() {
    this.unidadeService.obterListaUnidadeMedida().subscribe((listaUnidadeMedidas: UnidadeMedida[]) => {
      this.listaUnidadeMedidas = listaUnidadeMedidas;
    });
  };

  obterListaIngrediente() {
    this.ingredienteService.obterListaIngredientes().subscribe((listaIngredientes: Ingrediente[]) => {
      this.listaIngredientes = listaIngredientes;
    })
  };

  enviarCompraIngredienteForm() {
    if (this.compraIngredienteExistente()) {
      this.editarCompraIngrediente();
    }
    else this.adicionarCompraIngrediente();
  };

  adicionarCompraIngrediente() {
    this.service.adicionarCompraIngrediente(this.compraIngrediente).subscribe((compraIngrediente: CompraIngrediente) => {
      this.router.navigateByUrl(`CompraIngrediente/editar/${compraIngrediente.id}`);
    });
  };

  editarCompraIngrediente() {
    this.service.editarCompraIngrediente(this.compraIngrediente).subscribe((compraIngrediente: CompraIngrediente) => {
      this.router.navigateByUrl(`CompraIngrediente/editar/${compraIngrediente.id}`);
    });
  };

  voltar() {
    this.router.navigateByUrl(`CompraIngrediente`);
  };

}
