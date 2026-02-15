import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoIdiomasComponent } from './components/listado-idiomas/listado-idiomas.component';
import { ListaComposicionesComponent } from './components/composiciones/lista-composiciones/lista-composiciones.component';
import { BuscadorTextosComponent } from './components/buscador-textos/buscador-textos.component';


const routes: Routes = [
  {path:'administracion',component:ListadoIdiomasComponent},
  {path:'composiciones',component:ListaComposicionesComponent},
  {path:'textos',component:BuscadorTextosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class I18NRoutingModule { }
