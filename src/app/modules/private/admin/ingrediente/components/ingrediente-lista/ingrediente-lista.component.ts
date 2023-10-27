import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { time } from 'console';
import { IngredienteAdicionarComponent } from '../ingrediente-adicionar/ingrediente-adicionar.component';
import { IngredienteService } from '../../service/ingrediente.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ingrediente-lista',
  templateUrl: './ingrediente-lista.component.html',
  styleUrls: ['./ingrediente-lista.component.scss']
})
export class IngredienteListaComponent implements OnInit {

  cadastroVisivel= false;
  @ViewChild(IngredienteAdicionarComponent)
  ingredienteAdicionarComponent!:IngredienteAdicionarComponent;

  itens = [] as any[];



  constructor(public service:IngredienteService, private changedetect:ChangeDetectorRef, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.service.getLista().subscribe((itens : any[]) => {
      this.itens = itens;
    })
  }
  
  atualizarPagina(){
    this.cadastroVisivel=true;
    this.service.getLista().subscribe((itens : any[]) => {
      this.itens = itens;
    });
    this.cadastroVisivel=false;
  }

  excluir(item:any){
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do registro?',
      header: 'Confirmação exclusão',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.excluir(item.id,item.nome,item.dataCadastro).subscribe();
        this.atualizarPagina();
        this.changedetect.detectChanges();
      },
      reject: (type: any) => {
      },
      key: "positionDialog"
  });
    
  }

  selecionar(item:any){
    this.cadastroVisivel = true;
    this.changedetect.detectChanges();
    this.ingredienteAdicionarComponent.atualizar(item);
  }

  novoCadastro(){
    this.cadastroVisivel=true;
    this.changedetect.detectChanges();
    this.ingredienteAdicionarComponent.novo();
  }

  fechar(){
    this.atualizarPagina();
    this.changedetect.detectChanges();
  }
}

