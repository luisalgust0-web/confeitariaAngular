import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredienteService } from '../../service/ingrediente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.scss']
})
export class IngredienteFormComponent implements OnInit {

  alert = false;
  id: number|null = null;
  nome:string|null=null;
  dataCadastro:Date|null=null;

  constructor(private service:IngredienteService, private router:Router, private route:ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.dataCadastro = new Date();

    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id') ? Number(routeParams.get('id')) : null;
    
    if(this.id != null){
      this.service.obterIngrediente(this.id).subscribe( ( ingrediente:any ) => {
        this.definirIngredienteValue(ingrediente);
      })
    }

  }

  enviarIngrediente() {
    if(this.nome == null) this.alert = true;

    this.service.enviarIngrediente(this.id,this.nome,this.dataCadastro).subscribe( ( ingrediente:any ) => {
      this.messageService.add( {severity:'success', summary:'Sucesso', detail:'Operação Realizada com Sucesso'});
      this.router.navigateByUrl(`Ingrediente/editar/${ingrediente.id}`);
    });
  }

  definirIngredienteValue(ingrediente:any){
    this.id = ingrediente.id;
    this.nome = ingrediente.nome;
    this.dataCadastro = ingrediente.dataCadastro;
  }

  voltar(){
    this.router.navigate(['/Ingrediente']);
  }
}
