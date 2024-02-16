import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../receita/service/receita.service';
import { IngredienteService } from '../../../ingrediente/service/ingrediente.service';
import { ReceitaIngredienteService } from '../../service/receita-ingrediente.service';
import { ReceitaingredienteAdicionarComponent } from '../receitaingrediente-adicionar/receitaingrediente-adicionar.component';
import { UnidademedidaService } from '../../../unidadeMedida/service/unidademedida.service';

@Component({
  selector: 'app-receitaingrediente-lista',
  templateUrl: './receitaingrediente-lista.component.html',
  styleUrls: ['./receitaingrediente-lista.component.scss']
})
export class ReceitaingredienteListaComponent implements OnInit {

  receitaIngrediente= [] as any[];
  id=0;
  unidadeMedidaId:number|null=null;
  ingredienteId:number|null=null;
  receitaId:number|null=null;
  quantidade:number|null=null;
  dataCadastro:Date|null=null;

  receita: any; 

  @ViewChild(ReceitaingredienteAdicionarComponent)
  receitaingredienteadicionar!:ReceitaingredienteAdicionarComponent;

  cadastroVisivel=false;

  constructor(private service:ReceitaIngredienteService, private changedetect:ChangeDetectorRef ) { }

  ngOnInit(): void {


  }

  iniciar(receita: any){
    this.receita = receita;
    console.log(receita)
    this.service.getListaPorId(this.receita.id).subscribe((receitaIngrediente : any[]) =>{
      this.receitaIngrediente = receitaIngrediente;
   })
  }

  atualizarPagina(){
    this.cadastroVisivel=true;
    this.service.getLista().subscribe((receitaIngrediente : any[]) =>{
      this.receitaIngrediente = receitaIngrediente;
   });
   this.cadastroVisivel=false;
  }

  selecionar(item : any){
    this.cadastroVisivel=true;
    this.changedetect.detectChanges();
    this.receitaingredienteadicionar.atualizar(item);
  }

  excluir(item : any){
    this.service.excluir(item.id,item.unidadeMedidaId,item.receitaId,item.ingredienteId,item.quantidade).subscribe();
    this.atualizarPagina();
    this.changedetect.detectChanges();
  }

  fechar(){
    this.atualizarPagina();
    this.changedetect.detectChanges();
  }
}
