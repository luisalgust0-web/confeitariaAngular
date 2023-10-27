import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReceitaListaComponent } from './receita/components/receita-lista/receita-lista.component';
import { IngredienteListaComponent } from './ingrediente/components/ingrediente-lista/ingrediente-lista.component';
import { UnidademedidalistaComponent } from './unidadeMedida/components/unidademedida-lista/unidademedida-lista.component';
import { UnidademedidaAdicionarComponent } from './unidadeMedida/components/unidademedida-adicionar/unidademedida-adicionar.component';
import { IngredienteAdicionarComponent } from './ingrediente/components/ingrediente-adicionar/ingrediente-adicionar.component';
import { ReceitaComponent } from './receita/components/receita-adicionar/receita-adicionar.component';
import { ReceitaingredienteAdicionarComponent } from './receitaIngrediente/components/receitaingrediente-adicionar/receitaingrediente-adicionar.component';
import { ReceitaingredienteListaComponent } from './receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';
import { CompraListaComponent } from './compra/components/compra-lista/compra-lista.component';
import { CompraAdicionarComponent } from './compra/components/compra-adicionar/compra-adicionar.component';
import { UsuarioAdicionarComponent } from './authentication/components/newUser/usuario-adicionar.component';
import { RotinaDisparoComponent } from './rotinaDisparo/components/rotina-disparo/rotina-disparo.component';
import { TemplateEmailComponent } from './templateEmail/components/template-email/template-email.component';
import { TemplateEmailAdicionarComponent } from './templateEmail/components/template-email-adicionar/template-email-adicionar.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: ReceitaListaComponent },
      { path: 'receitacriar', component: ReceitaComponent},
      { path: 'ingrediente', component: IngredienteListaComponent },
      { path: 'unidademedida', component: UnidademedidalistaComponent},
      { path: 'unidademedidacriar', component: UnidademedidaAdicionarComponent},
      { path: 'ingredientecriar', component: IngredienteAdicionarComponent},
      { path: 'receitaingredientecriar', component: ReceitaingredienteAdicionarComponent},
      { path: 'receitaingrediente', component: ReceitaingredienteListaComponent},
      { path: 'compra', component: CompraListaComponent},
      { path: 'compraadicioanr', component: CompraAdicionarComponent},
      { path: 'usuarioadicionar', component: UsuarioAdicionarComponent},
      { path: 'rotinaDisparo', component: RotinaDisparoComponent},
      { path : 'templateLista', component: TemplateEmailComponent},
      { path : 'templateAdicionar',  component: TemplateEmailAdicionarComponent}
    ])
  ]
})
export class AdminRoutingModule { 

}
