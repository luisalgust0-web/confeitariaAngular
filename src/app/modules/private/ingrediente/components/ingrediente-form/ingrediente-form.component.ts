import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredienteService } from '../../service/ingrediente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Ingrediente } from '../../models/ingrediente';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.scss']
})
export class IngredienteFormComponent implements OnInit {

  alert = false;
  ingrediente: Ingrediente = { dataCadastro: new Date() } as Ingrediente;

  constructor(
    private service: IngredienteService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obterParametrosDeRota();

    if (this.ingredienteExistente()) {
      this.obterIngrediente();
    }

  }

  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;
    this.ingrediente.id = routeParams.get('id') ? Number(routeParams.get('id')) : 0;
  }

  ingredienteExistente(): boolean {
    if (this.ingrediente.id != 0) {
      return true;
    }
    return false;
  }

  obterIngrediente(){
    this.service.obterIngrediente(this.ingrediente.id).subscribe((ingrediente: Ingrediente) => {
      this.definirIngredienteValue(ingrediente);
    });
  }

  definirIngredienteValue(ingrediente: Ingrediente) {
    this.ingrediente = ingrediente;
  }

  enviarIngredienteForm(){
    if(this.ingredienteExistente())
    {
      this.editarIngrediente();
    }
    else
    {
      this.adicionarIngrediente();
    }
  }

  adicionarIngrediente() {
    this.service.adicionarIngrediente(this.ingrediente).subscribe((ingrediente: Ingrediente) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Ingrediente/editar/${ingrediente.id}`);
    });
    this.alert = true;
  }

  editarIngrediente() {
    this.service.editarIngrediente(this.ingrediente).subscribe((ingrediente: Ingrediente) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Ingrediente/editar/${ingrediente.id}`);
    });
    this.alert = true;
  }

  voltar() {
    this.router.navigate(['/Ingrediente']);
  }
}
