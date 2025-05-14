import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorElementosComponentComponent } from './componentes/buscador-elementos-component/buscador-elementos-component.component';

const routes: Routes = [
  {path:'',component:BuscadorElementosComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementosRoutingModule { }
