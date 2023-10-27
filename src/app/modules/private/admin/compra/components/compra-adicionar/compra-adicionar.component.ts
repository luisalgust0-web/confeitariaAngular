import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { runInThisContext } from 'vm';
import { CompraService } from '../../service/compra.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';

@Component({
  selector: 'app-compra-adicionar',
  templateUrl: './compra-adicionar.component.html',
  styleUrls: ['./compra-adicionar.component.scss']
})
export class CompraAdicionarComponent implements OnInit {

  id=0;
  unidadeMedidaId:number|null=null;
  ingredienteId:number|null=null;
  quantidade:number|null=null;
  valor:number|null=null;
  dataCompra:Date|null=null;

  unidadeMedidas = [] as any[];
  ingredientes = [] as any[];

  constructor(public service:CompraService,public unidadeService:UnidademedidaService,public ingredienteService:IngredienteService) { }

  @Output()
  onClose=new EventEmitter();

  
  ngOnInit(): void {
    this.unidadeService.getLista().subscribe((item : any) =>{
        this.unidadeMedidas = item;
    })

    this.ingredienteService.getLista().subscribe((item : any )=>{
      this.ingredientes = item;
    })
  }

  adicionar(){
    this.service.enviar(this.id,this.ingredienteId,this.unidadeMedidaId,this.quantidade,this.dataCompra,this.valor).subscribe();
    console.log(this.id);
    console.log(this.ingredienteId);
    console.log(this.unidadeMedidaId);
    console.log(this.quantidade);
    console.log(this.dataCompra);
    console.log(this.valor);
    this.onClose.emit();
  }

  novo(){
    this.dataCompra = new Date();
  }

  atualizar(item : any){
    this.id = item.id;
    this.ingredienteId = item.ingredienteId;
    this.unidadeMedidaId = item.unidadeMedidaId;
    this.quantidade = item.quantidade;
    this.dataCompra = item.dataCompra;
    this.valor = item.valor;
    console.log(item);
  }
  
  fechar(){
    this.onClose.emit();
  }

}
