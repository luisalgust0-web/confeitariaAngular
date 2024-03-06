import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { LoginComponent } from '../shared/authentication/components/login/login.component';
import { UsuarioAdicionarComponent } from '../shared/authentication/components/newUser/usuario-adicionar.component';
import { IngredienteFormComponent } from './ingrediente/components/ingrediente-form/ingrediente-form.component';
import { IngredienteListaComponent } from './ingrediente/components/ingrediente-lista/ingrediente-lista.component';
import { ReceitaFormComponent } from './receita/components/receita-form/receita-form.component';
import { ReceitaListaComponent } from './receita/components/receita-lista/receita-lista.component';
import { ReceitaingredienteFormComponent } from './receitaIngrediente/components/receitaingrediente-form/receitaingrediente-form.component';
import { ReceitaingredienteListaComponent } from './receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';
import { UnidademedidaFormComponent } from './unidadeMedida/components/unidademedida-form/unidademedida-form.component';
import { UnidademedidalistaComponent } from './unidadeMedida/components/unidademedida-lista/unidademedida-lista.component';
import { ComponentesModule } from '../componentes.module';
import { compraIngredienteFormComponent } from './compraIngrediente/components/compraIngrediente-form/compraIngrediente-form.component';
import { CompraIngredienteListaComponent } from './compraIngrediente/components/compraIngrediente-lista/compraIngrediente-lista.component';


@NgModule({
  declarations: [
    ReceitaListaComponent,
    ReceitaFormComponent,
    IngredienteListaComponent,
    UnidademedidalistaComponent,
    UnidademedidaFormComponent,
    IngredienteFormComponent,
    ReceitaingredienteFormComponent,
    ReceitaingredienteListaComponent,
    compraIngredienteFormComponent,
    CompraIngredienteListaComponent,
    LoginComponent,
    UsuarioAdicionarComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ComponentesModule
    ]
})
export class PrivateModule { }
