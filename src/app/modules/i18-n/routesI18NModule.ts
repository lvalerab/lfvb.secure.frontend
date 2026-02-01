import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoIdiomasComponent } from './components/listado-idiomas/listado-idiomas.component';


const routes: Routes = [
  {path:'administracion',component:ListadoIdiomasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class I18NRoutingModule { }
