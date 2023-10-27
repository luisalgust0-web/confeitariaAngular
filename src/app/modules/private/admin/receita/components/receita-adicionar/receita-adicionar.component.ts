import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { AdminService } from '../../service/receita.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-receita-adicionar',
  templateUrl: './receita-adicionar.component.html',
  styleUrls: ['./receita-adicionar.component.scss']
})
export class ReceitaComponent implements OnInit {
  alert = false;

  id = 0;
  nome: string | null = null;
  modoPreparo: string | null = null;
  dataCadastro: Date | null = new Date();

  constructor(private service: AdminService, private fb: FormBuilder, private messageService : MessageService) { }

  fileForm: FormGroup = this.fb.group({
    arquivoFisico: new FormControl<any>(null)
  })

  @Output()
  onClose = new EventEmitter();


  ngOnInit(): void {
  }

  novo() {
    this.dataCadastro = new Date();
  }

  uploadImage(event: any) {
    if (event.target.files.lenght != 0) {
      const file = event.target.files[0];
      this.fileForm.controls.arquivoFisico.patchValue(file);
    } else {
      this.fileForm.controls.arquivoFisico.reset();
    }
  }

  enviar() {
    this.service.enviar(this.id, this.nome, this.modoPreparo, this.dataCadastro, this.fileForm.controls.arquivoFisico.value).subscribe((resp : any) => {
        this.onClose.emit();
        this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'})
      });
    this.alert = true;
  }

  atualizar(item: any) {
    this.id = item.id;
    this.modoPreparo = item.modoPreparo;
    this.nome = item.nome;
    this.dataCadastro = item.dataCadastro;
    console.log(item);
  }

  voltar() {
    this.onClose.emit();
  }
}
