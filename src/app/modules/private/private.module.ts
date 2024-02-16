import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { LoginComponent } from '../shared/authentication/components/login/login.component';
import { UsuarioAdicionarComponent } from '../shared/authentication/components/newUser/usuario-adicionar.component';
import { CompraAdicionarComponent } from './compra/components/compra-adicionar/compra-adicionar.component';
import { CompraListaComponent } from './compra/components/compra-lista/compra-lista.component';
import { IngredienteFormComponent } from './ingrediente/components/ingrediente-form/ingrediente-form.component';
import { IngredienteListaComponent } from './ingrediente/components/ingrediente-lista/ingrediente-lista.component';
import { ReceitaFormComponent } from './receita/components/receita-form/receita-form.component';
import { ReceitaListaComponent } from './receita/components/receita-lista/receita-lista.component';
import { ReceitaingredienteAdicionarComponent } from './receitaIngrediente/components/receitaingrediente-adicionar/receitaingrediente-adicionar.component';
import { ReceitaingredienteListaComponent } from './receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';
import { RotinaDisparoComponent } from './rotinaDisparo/components/rotina-disparo/rotina-disparo.component';
import { TemplateEmailAdicionarComponent } from './templateEmail/components/template-email-adicionar/template-email-adicionar.component';
import { TemplateEmailComponent } from './templateEmail/components/template-email/template-email.component';
import { UnidademedidaAdicionarComponent } from './unidadeMedida/components/unidademedida-adicionar/unidademedida-adicionar.component';
import { UnidademedidalistaComponent } from './unidadeMedida/components/unidademedida-lista/unidademedida-lista.component';
import { ComponentesModule } from '../componentes.module';


@NgModule({
  declarations: [
    ReceitaListaComponent,
    ReceitaFormComponent,
    IngredienteListaComponent,
    UnidademedidalistaComponent,
    UnidademedidaAdicionarComponent,
    IngredienteFormComponent,
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
    PrivateRoutingModule,
    ComponentesModule
    ]
})
export class PrivateModule { }
