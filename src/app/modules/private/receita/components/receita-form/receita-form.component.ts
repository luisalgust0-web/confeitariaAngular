import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../../service/receita.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Receita } from '../../models/receita';
import { REPLCommand } from 'repl';
import { ImagemReceita } from '../../models/imagem-receita';
import { Console } from 'console';

@Component({
  selector: 'app-receita-form',
  templateUrl: './receita-form.component.html',
  styleUrls: ['./receita-form.component.scss']
})
export class ReceitaFormComponent implements OnInit {

  alert = false;
  receita: Receita = { dataCadastro: new Date().toISOString() } as Receita;
  imagemReceita: ImagemReceita = {} as ImagemReceita;

  constructor(
    private service: AdminService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.obterParametrosDeRota();

    if(this.receitaExistente()){
      this.obterReceita();
    }
  }

  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;
    this.receita.id = routeParams.get('id') ? Number(routeParams.get('id')) : 0;
  }

  receitaExistente(): boolean {
    if (this.receita.id != 0) {
      return true;
    }
    return false;
  }

  obterReceita() {
    this.service.obterReceita(this.receita.id).subscribe((receita: Receita) => {
      this.definirReceita(receita);
    })
  }

  definirReceita(receita: Receita) {
    this.receita = receita;
  }

  uploadImagemReceita(event: any) {
    if (event.target.files.lenght != 0) {
      const file = event.target.files[0];
      this.imagemReceita.imageFile = file;
    }
  }

  enviarReceitaForm() {
    if(this.receitaExistente())
    {
      this.editarReceita();
    }
    else
    {
      this.adicionarReceita();
    }
  }

  adicionarReceita() {
    this.service.adicionarReceita(this.receita, this.imagemReceita).subscribe((receita: Receita) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Receita/editar/${receita.id}`);
    });
    this.alert = true;
  }

  editarReceita() {
    this.service.editarReceita(this.receita, this.imagemReceita).subscribe((receita: Receita) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Receita/editar/${receita.id}`);
    });
    this.alert = true;
  }

  voltar() {
    this.router.navigate(['Receita'])
  }

}
