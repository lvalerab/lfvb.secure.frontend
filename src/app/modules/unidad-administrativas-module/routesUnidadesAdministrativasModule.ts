import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaArbolUnidadesOrganizativasComponent } from './components/ficha-arbol-unidades-organizativas/ficha-arbol-unidades-organizativas.component';
import { FichaAdminArbolUnidadesAdministrativasComponent } from './components/ficha-admin-arbol-unidades-administrativas/ficha-admin-arbol-unidades-administrativas.component';



const routes: Routes = [
  {path:'admin',component:FichaAdminArbolUnidadesAdministrativasComponent},
  {path:'', component:FichaArbolUnidadesOrganizativasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesAdministrativasRoutingModule { }