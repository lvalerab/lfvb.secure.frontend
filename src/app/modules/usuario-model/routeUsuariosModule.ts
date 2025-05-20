import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponentComponent } from './components/listado-usuarios-component/listado-usuarios-component.component';

const routes: Routes = [
  {path:'',component:ListadoUsuariosComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
