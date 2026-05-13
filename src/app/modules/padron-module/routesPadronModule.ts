import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorPersonasComponentComponent } from './components/buscador-personas-component/buscador-personas-component.component';
import { FichaPersonaComponentComponent } from './components/ficha-persona-component/ficha-persona-component.component';



const routes: Routes = [
  {path:"",component:BuscadorPersonasComponentComponent},
  {path:"persona",component:FichaPersonaComponentComponent},
  {path:"persona/:id",component:FichaPersonaComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PadronRountingModule { }
