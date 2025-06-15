import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponentComponent } from './components/listado-usuarios-component/listado-usuarios-component.component';
import { FichaUsuarioComponentComponent } from './components/ficha-usuario-component/ficha-usuario-component.component';
import { ListadoAplicacionesComponentComponent } from './components/listado-aplicaciones-component/listado-aplicaciones-component.component';
import { FichaAplicacionComponentComponent } from './components/ficha-aplicacion-component/ficha-aplicacion-component.component';
import { ListadoGruposPermisosComponent } from './components/listado-grupos-permisos/listado-grupos-permisos.component';
import { FichaGrupoPermisosComponent } from './components/ficha-grupo-permisos/ficha-grupo-permisos.component';

const routes: Routes = [
  {path:'usuarios',component:ListadoUsuariosComponentComponent},
  {path:'usuario',component:FichaUsuarioComponentComponent},
  {path:'usuario/:id',component:FichaUsuarioComponentComponent},
  {path:'aplicaciones',component:ListadoAplicacionesComponentComponent},
  {path:'aplicacion/:id',component:FichaAplicacionComponentComponent},
  {path:'grupos',component:ListadoGruposPermisosComponent},
  {path:'grupo/:id',component:FichaGrupoPermisosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionGeneralRouteModule { }
