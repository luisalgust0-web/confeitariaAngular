import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UnidademedidaAdicionarComponent } from '../unidademedida-adicionar/unidademedida-adicionar.component';
import { UnidademedidaService } from '../../service/unidademedida.service';

@Component({
  selector: 'app-unidademedida-lista',
  templateUrl: './unidademedida-lista.component.html',
  styleUrls: ['./unidademedida-lista.component.scss']
})
export class UnidademedidalistaComponent implements OnInit {

  cadastroVisivel = false;
  @ViewChild(UnidademedidaAdicionarComponent)
  unidadeAdicionarComponent!:UnidademedidaAdicionarComponent;

  itens = [] as any[];

  constructor(public service:UnidademedidaService, private changedetect:ChangeDetectorRef ){}

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

  selecionar(item:any){
      this.cadastroVisivel = true;
      this.changedetect.detectChanges();
      this.unidadeAdicionarComponent.atualizar(item);
  }

  novo(){
    this.cadastroVisivel= true;
    this.changedetect.detectChanges();
    this.unidadeAdicionarComponent.novo();
  }

  excluir(item : any){
    this.service.excluir(item.id,item.sigla,item.nome).subscribe();
    this.atualizarPagina();
    this.changedetect.detectChanges();
  }
  
  fechar(){
    this.atualizarPagina();
    this.changedetect.detectChanges();
  }
}
