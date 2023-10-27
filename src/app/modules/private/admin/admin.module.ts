import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReceitaListaComponent } from './receita/components/receita-lista/receita-lista.component';
import { ComponentesModule } from '../../componentes.module';
import { ReceitaComponent } from './receita/components/receita-adicionar/receita-adicionar.component';
import { IngredienteListaComponent } from './ingrediente/components/ingrediente-lista/ingrediente-lista.component';
import { UnidademedidalistaComponent } from './unidadeMedida/components/unidademedida-lista/unidademedida-lista.component';
import { UnidademedidaAdicionarComponent } from './unidadeMedida/components/unidademedida-adicionar/unidademedida-adicionar.component';
import { IngredienteAdicionarComponent } from './ingrediente/components/ingrediente-adicionar/ingrediente-adicionar.component';
import { ReceitaingredienteAdicionarComponent } from './receitaIngrediente/components/receitaingrediente-adicionar/receitaingrediente-adicionar.component';
import { ReceitaingredienteListaComponent } from './receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';
import { CompraListaComponent } from './compra/components/compra-lista/compra-lista.component';
import { CompraAdicionarComponent } from './compra/components/compra-adicionar/compra-adicionar.component';
import {DialogModule} from 'primeng/dialog';
import { UsuarioAdicionarComponent } from './authentication/components/newUser/usuario-adicionar.component';
import { RotinaDisparoComponent } from './rotinaDisparo/components/rotina-disparo/rotina-disparo.component';
import { TemplateEmailComponent } from './templateEmail/components/template-email/template-email.component';
import { TemplateEmailAdicionarComponent } from './templateEmail/components/template-email-adicionar/template-email-adicionar.component';
import { LoginComponent } from './authentication/components/login/login.component';




@NgModule({
  declarations: [
    ReceitaListaComponent,
    ReceitaComponent,
    IngredienteListaComponent,
    UnidademedidalistaComponent,
    UnidademedidaAdicionarComponent,
    IngredienteAdicionarComponent,
    ReceitaingredienteAdicionarComponent,
    ReceitaingredienteListaComponent,
    CompraListaComponent,
    CompraAdicionarComponent,
    LoginComponent,
    UsuarioAdicionarComponent,
    RotinaDisparoComponent,
    TemplateEmailComponent,
    TemplateEmailAdicionarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentesModule,
  ]
})
export class AdminModule { }
