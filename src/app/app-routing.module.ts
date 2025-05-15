import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'elementos',
    loadChildren: ()=> import('@modules/elementos-module/elementos-module.module').then(m=>m.ElementosModuleModule)
  },
  {
    path:'propiedades',
    loadChildren: () => import('@modules/propiedades-model/propiedades-model.module').then(m=>m.PropiedadesModelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
