import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-usuario-adicionar',
  templateUrl: './usuario-adicionar.component.html',
  styleUrls: ['./usuario-adicionar.component.scss']
})
export class UsuarioAdicionarComponent implements OnInit {

  constructor(private fb: FormBuilder,private service : UsuarioService) { }

  id=0;

  ngOnInit(): void {
  }

  Usuario = this.fb.group({
    Nome:this.fb.control<string>("",{validators:[Validators.required]}),
    LoginNome:this.fb.control<string>("",{validators:[Validators.required]}),
    Senha:this.fb.control<string>("",{validators:[Validators.required]})
  })

  public enviar(){
    if(this.Usuario.valid){
      this.service.enviar(this.id,this.Usuario.controls.Nome.value,this.Usuario.controls.LoginNome.value,this.Usuario.controls.Senha.value).subscribe(( response: any) => { 
      } );
    }
  }
}
