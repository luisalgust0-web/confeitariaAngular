import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioAdicionarComponent } from '../shared/authentication/components/newUser/usuario-adicionar.component';
import { CompraListaComponent } from './compra/components/compra-lista/compra-lista.component';
import { IngredienteListaComponent } from './ingrediente/components/ingrediente-lista/ingrediente-lista.component';
import { ReceitaListaComponent } from './receita/components/receita-lista/receita-lista.component';
import { ReceitaingredienteListaComponent } from './receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';
import { RotinaDisparoComponent } from './rotinaDisparo/components/rotina-disparo/rotina-disparo.component';
import { TemplateEmailAdicionarComponent } from './templateEmail/components/template-email-adicionar/template-email-adicionar.component';
import { TemplateEmailComponent } from './templateEmail/components/template-email/template-email.component';
import { UnidademedidalistaComponent } from './unidadeMedida/components/unidademedida-lista/unidademedida-lista.component';
import { IngredienteFormComponent } from './ingrediente/components/ingrediente-form/ingrediente-form.component';
import { ReceitaFormComponent } from './receita/components/receita-form/receita-form.component';
import { ReceitaingredienteFormComponent } from './receitaIngrediente/components/receitaingrediente-form/receitaingrediente-form.component';
import { UnidademedidaFormComponent } from './unidadeMedida/components/unidademedida-form/unidademedida-form.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'Receita',
        children: [
          {path: '', component: ReceitaListaComponent },
          {path: 'inserir', component: ReceitaFormComponent },
          {path: 'editar/:id', component: ReceitaFormComponent },
          {path: 'ReceitaIngrediente/:receitaId', children: [
            {path: '', component: ReceitaingredienteListaComponent},
            {path: 'inserir', component: ReceitaingredienteFormComponent},
            {path: 'editar/:id', component: ReceitaingredienteFormComponent},
          ]
        }
        ]
      },
      { 
        path: 'Ingrediente',
        children: [
          {path: '', component: IngredienteListaComponent,},
          {path: 'inserir', component: IngredienteFormComponent },
          {path: 'editar/:id', component: IngredienteFormComponent}
        ]
      },
      { 
        path: 'UnidadeMedida',
        children:[
          {path: '', component: UnidademedidalistaComponent},
          {path: 'inserir', component: UnidademedidaFormComponent },
          {path: 'editar/:id', component: UnidademedidaFormComponent }
        ],
      },
      { path: 'Compra', component: CompraListaComponent},
      { path: 'UsuarioAdicionar', component: UsuarioAdicionarComponent},
      { path: 'RotinaDisparo', component: RotinaDisparoComponent},
      { path : 'TemplateLista', component: TemplateEmailComponent},
      { path : 'TemplateAdicionar',  component: TemplateEmailAdicionarComponent},
      ])
    ],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }
