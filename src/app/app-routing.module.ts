import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C404NotFoundComponentComponent } from './layout/c404-not-found-component/c404-not-found-component.component';
import { PrincipalComponent } from './layout/principal/principal.component';

const routes: Routes = [
  {path:'elementos',
    loadChildren: ()=> import('@modules/elementos-module/elementos-module.module').then(m=>m.ElementosModuleModule)
  },
  {
    path:'propiedades',
    loadChildren: () => import('@modules/propiedades-model/propiedades-model.module').then(m=>m.PropiedadesModelModule)
  },
  {
    path:'usuarios',
    loadChildren: () => import('@modules/usuario-model/usuario-model.module').then(m=>m.UsuarioModelModule)
  },
  {
    path:'',
    component:PrincipalComponent
  },
  {
    path:'**',
    component:C404NotFoundComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
