import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaAdministracionCoreAplicacionComponent } from './componentes/ficha-administracion-core-aplicacion/ficha-administracion-core-aplicacion.component';

const routes: Routes = [
  {path:'',component:FichaAdministracionCoreAplicacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class routeAdministracionCoreModule { }
