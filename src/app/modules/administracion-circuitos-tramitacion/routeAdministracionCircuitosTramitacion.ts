import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTramitesGeneralesComponent } from './components/listado-tramites-generales/listado-tramites-generales.component';
import { FichaTramiteComponentComponent } from './components/ficha-tramite-component/ficha-tramite-component.component';


const routes: Routes = [        
    {path:'tramite/:id',component:FichaTramiteComponentComponent},
    {
        path:'',
        component:ListadoTramitesGeneralesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionCircuitosTramitacionRouteModule { }
