import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaArbolUnidadesOrganizativasComponent } from './components/ficha-arbol-unidades-organizativas/ficha-arbol-unidades-organizativas.component';



const routes: Routes = [
  {path:'', component:FichaArbolUnidadesOrganizativasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesAdministrativasRoutingModule { }