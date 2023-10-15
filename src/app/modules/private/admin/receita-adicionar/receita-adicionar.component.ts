import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OutletContext } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-receita-adicionar',
  templateUrl: './receita-adicionar.component.html',
  styleUrls: ['./receita-adicionar.component.scss']
})
export class ReceitaComponent implements OnInit {
  alert=false;

  id=0;
  nome:string|null=null;
  modoPreparo:string|null=null;
  dataCadastro:Date|null=null;

  constructor(private service:AdminService, private fb : FormBuilder) { }

  arquivoForm : FormGroup = this.fb.group({
    arquivoFisico : new FormControl<any>(null)
  })

  @Output()
  onClose = new EventEmitter();


  ngOnInit(): void {
  }
  
  novo(){
    this.dataCadastro= new Date();
  }

  enviar(){
    this.service.enviar(this.id,this.nome,this.modoPreparo,this.dataCadastro).subscribe((resp:any)=> {
      this.onClose.emit();
    });
    this.alert = true;
  }

  enviarArquivo(event : any){
    if(event.target.file.lenght > 0){
      const file = event.target.files[0];
      this.arquivoForm.controls.arquivoFisico.setValue(file);
    }
  }

  atualizar(item:any){
    this.id= item.id;
    this.modoPreparo= item.modoPreparo;
    this.nome= item.nome;
    this.dataCadastro= item.dataCadastro;
    console.log(item);
  }

  voltar(){
    this.onClose.emit();
  }
}
