import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponentComponent } from './components/listado-usuarios-component/listado-usuarios-component.component';
import { FichaUsuarioComponentComponent } from './components/ficha-usuario-component/ficha-usuario-component.component';

const routes: Routes = [
  {path:'usuarios',component:ListadoUsuariosComponentComponent},
  {path:'usuario/:id',component:FichaUsuarioComponentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionGeneralRouteModule { }
