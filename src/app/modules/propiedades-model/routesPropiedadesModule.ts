import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguradorElementoComponentComponent } from './components/configurador-elemento-component/configurador-elemento-component.component';


const routes: Routes = [
  {path:'',component:ConfiguradorElementoComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadesRoutingModule { }
