import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnidademedidaService } from '../../service/unidademedida.service';
import { ActivatedRoute, Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { UnidadeMedida } from '../../models/unidade-medida';
import { MessageService } from 'primeng/api';
import { NOMEM } from 'dns';

@Component({
  selector: 'app-unidademedida-form',
  templateUrl: './unidademedida-form.component.html',
  styleUrls: ['./unidademedida-form.component.scss']
})
export class UnidademedidaFormComponent implements OnInit {

  alert = false
  unidadeMedida: UnidadeMedida = { dataCadastro: new Date() } as UnidadeMedida;

  constructor(
    private service: UnidademedidaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.obterParametrosDeRota()

    if (this.unidadeMedidaExistente(this.unidadeMedida)) {
      this.obterUnidadeMedida();
    }
  }

  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;
    this.unidadeMedida.id = routeParams.get('id') ? Number(routeParams.get('id')) : 0;
  }

  unidadeMedidaExistente(unidadeMedida: UnidadeMedida): boolean {
    if (unidadeMedida.id != 0) {
      return true;
    }
    return false;
  }

  obterUnidadeMedida() {
    this.service.obterUnidadeMedida(this.unidadeMedida.id).subscribe((unidadeMedida: UnidadeMedida) => {
      this.definirUnidadeMedida(unidadeMedida);
    });
  }

  definirUnidadeMedida(unidadeMedida: UnidadeMedida) {
    this.unidadeMedida = unidadeMedida;
  }

  enviarUnidadeMedida() {
    this.service.enviarUnidadeMedida(this.unidadeMedida).subscribe((unidadeMedida: UnidadeMedida) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`UnidadeMedida/editar/${unidadeMedida.id}`)
    });
    this.alert = true;
  }

  voltar() {
    this.router.navigate(['UnidadeMedida/'])
  }
}
