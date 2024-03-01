import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../../service/receita.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Receita } from '../../models/receita';
import { REPLCommand } from 'repl';

@Component({
  selector: 'app-receita-form',
  templateUrl: './receita-form.component.html',
  styleUrls: ['./receita-form.component.scss']
})
export class ReceitaFormComponent implements OnInit {

  alert = false;
  receita: Receita = { dataCadastro: new Date() } as Receita;

  fileForm: FormGroup = this.fb.group({
    arquivoFisico: new FormControl<any>(null)
  })

  constructor(private service: AdminService, private fb: FormBuilder, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obterParametrosDeRota();

    if(this.receitaExistente(this.receita)){
      this.obterReceita();
    }
  }

  obterParametrosDeRota() {
    const routeParams = this.route.snapshot.paramMap;
    this.receita.id = routeParams.get('id') ? Number(routeParams.get('id')) : 0;
  }

  receitaExistente(receita: Receita): boolean {
    if (receita.id != 0) {
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

  uploadImage(event: any) {
    if (event.target.files.lenght != 0) {
      const file = event.target.files[0];
      this.fileForm.controls.arquivoFisico.patchValue(file);
    } else {
      this.fileForm.controls.arquivoFisico.reset();
    }
  }

  enviarReceita() {
    this.service.enviarReceita(this.receita, this.fileForm.controls.arquivoFisico.value).subscribe((receita: Receita) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação Realizada com Sucesso' });
      this.router.navigateByUrl(`Receita/editar/${receita.id}`);
    });
    this.alert = true;
  }

  voltar() {
    this.router.navigate(['Receita'])
  }

}
