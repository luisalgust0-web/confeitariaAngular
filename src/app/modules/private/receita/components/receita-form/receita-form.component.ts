import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../../service/receita.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receita-form',
  templateUrl: './receita-form.component.html',
  styleUrls: ['./receita-form.component.scss']
})
export class ReceitaFormComponent implements OnInit {

  alert = false;
  id :number | null = null;
  nome: string | null = null;
  modoPreparo: string | null = null;
  dataCadastro: Date | null = null;

  fileForm: FormGroup = this.fb.group({
    arquivoFisico: new FormControl<any>(null)
  })

  constructor(private service: AdminService, private fb: FormBuilder, private messageService : MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataCadastro = new Date();

    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id') ? Number(routeParams.get('id')) : null;

    if(this.id != null){
      this.service.obterReceita(this.id).subscribe( (receita:any) => {
        this.definirReceitaValue(receita);
      } )
    }

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
    if(this.nome == null || "") this.alert = true;
    this.service.enviarReceita(this.id, this.nome, this.modoPreparo, this.dataCadastro, this.fileForm.controls.arquivoFisico.value).subscribe( (receita : any) => {
      this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
        this.router.navigateByUrl(`Receita/editar/${receita.id}`);
      });
  }

  definirReceitaValue(receita: any) {
    this.id = receita.id;
    this.modoPreparo = receita.modoPreparo;
    this.nome = receita.nome;
    this.dataCadastro = receita.dataCadastro;
  }

  voltar(){
    this.router.navigate(['Receita'])
  }

}
