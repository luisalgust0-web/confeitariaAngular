import { ReturnStatement, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { warn } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private route: Router, private messageService : MessageService) { }

  public novoUsuarioBool : boolean = false;
  public usuarioAuth : boolean = false; 

  form = this.fb.group({
    nome: this.fb.control<string | null>(null, { validators: [Validators.required] }),
    senha: this.fb.control<string | null>(null, { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    // var valor1 = this.form.value;
    // var valor2 = this.form.getRawValue();
    // this.form.controls.nome.valid
  }

  limpar() {
    this.form.controls.nome.reset();
    this.form.controls.senha.reset();
  }

  logar() {
    this.authService.autenticarRemoto(this.form.controls.nome.value, this.form.controls.senha.value).subscribe((sucesso: boolean) => {
      if (sucesso == true) {
        this.route.navigate(['/admin']);
      }
    });
  }

  novoUsuario() {
    this.novoUsuarioBool = true;
  }

  get nomeValidator() {
    return this.form.controls.nome.valid;
  }

  // enviar(){
  //   if(!this.form.valid){
  //     return;
  //   }
  // }


  
}
