import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioAdicionarComponent } from '../shared/authentication/components/newUser/usuario-adicionar.component';
import { IngredienteListaComponent } from './ingrediente/components/ingrediente-lista/ingrediente-lista.component';
import { ReceitaListaComponent } from './receita/components/receita-lista/receita-lista.component';
import { ReceitaingredienteListaComponent } from './receitaIngrediente/components/receitaingrediente-lista/receitaingrediente-lista.component';
import { UnidademedidalistaComponent } from './unidadeMedida/components/unidademedida-lista/unidademedida-lista.component';
import { IngredienteFormComponent } from './ingrediente/components/ingrediente-form/ingrediente-form.component';
import { ReceitaFormComponent } from './receita/components/receita-form/receita-form.component';
import { ReceitaingredienteFormComponent } from './receitaIngrediente/components/receitaingrediente-form/receitaingrediente-form.component';
import { UnidademedidaFormComponent } from './unidadeMedida/components/unidademedida-form/unidademedida-form.component';
import { CompraIngredienteListaComponent } from './compraIngrediente/components/compraIngrediente-lista/compraIngrediente-lista.component';
import { compraIngredienteFormComponent } from './compraIngrediente/components/compraIngrediente-form/compraIngrediente-form.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'Receita',
        children: [
          { path: '', component: ReceitaListaComponent },
          { path: 'inserir', component: ReceitaFormComponent },
          { path: 'editar/:id', component: ReceitaFormComponent },
          {
            path: 'ReceitaIngrediente/:receitaId',
            children: [
              { path: '', component: ReceitaingredienteListaComponent },
              { path: 'inserir', component: ReceitaingredienteFormComponent },
              { path: 'editar/:id', component: ReceitaingredienteFormComponent },
            ]
          }
        ]
      },
      {
        path: 'Ingrediente',
        children: [
          { path: '', component: IngredienteListaComponent, },
          { path: 'inserir', component: IngredienteFormComponent },
          { path: 'editar/:id', component: IngredienteFormComponent }
        ]
      },
      {
        path: 'UnidadeMedida',
        children: [
          { path: '', component: UnidademedidalistaComponent },
          { path: 'inserir', component: UnidademedidaFormComponent },
          { path: 'editar/:id', component: UnidademedidaFormComponent }
        ],
      },
      {
        path: 'CompraIngrediente',
        children: [
          { path: '', component: CompraIngredienteListaComponent},
          { path: 'inserir', component: compraIngredienteFormComponent },
          { path: 'editar/:id', component: compraIngredienteFormComponent }
        ],
      },
      { path: 'UsuarioAdicionar', component: UsuarioAdicionarComponent },
    ])
  ],
  exports: [RouterModule],
})
export class PrivateRoutingModule { }
