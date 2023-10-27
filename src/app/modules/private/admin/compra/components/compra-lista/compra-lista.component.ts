import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { inflateSync } from 'zlib';
import { CompraAdicionarComponent } from '../compra-adicionar/compra-adicionar.component';
import { CompraService } from '../../service/compra.service';

@Component({
  selector: 'app-compra-lista',
  templateUrl: './compra-lista.component.html',
  styleUrls: ['./compra-lista.component.scss']
})
export class CompraListaComponent implements OnInit {

  cadastroVisivel = false;
  itens = [] as any[];

  @ViewChild(CompraAdicionarComponent)
  compraAdicionarComponent!:CompraAdicionarComponent;

  constructor(public service:CompraService,public changeDetected:ChangeDetectorRef) {}

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
    this.service.excluir(item.id,item.ingredienteId,item.unidadeMedidaId,item.quantidade,item.dataCompra,item.valor).subscribe();
    this.atualizarPagina();
    this.changeDetected.detectChanges();
  }

  selecionar(item:any){
    this.cadastroVisivel=true;
    this.changeDetected.detectChanges();
    this.compraAdicionarComponent.atualizar(item);
  }

  novoCadastro(){
    this.cadastroVisivel=true;
    this.changeDetected.detectChanges();
    this.compraAdicionarComponent.novo();
  }

  fechar(){
    this.atualizarPagina();
    this.changeDetected.detectChanges();
  }
}
