import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTramitesGeneralesComponent } from './components/listado-tramites-generales/listado-tramites-generales.component';
import { FichaTramiteComponentComponent } from './components/ficha-tramite-component/ficha-tramite-component.component';
import { BuscadorCircuitosComponent } from './components/circuitos/buscador-circuitos/buscador-circuitos.component';
import { FichaAltaCircuitoComponent } from './components/circuitos/ficha-alta-circuito/ficha-alta-circuito.component';


const routes: Routes = [            
    {path:'tramite/:id',component:FichaTramiteComponentComponent},
    {path:'tramite',component:FichaTramiteComponentComponent},
    {path:'circuitos/alta/:idTramite',component:FichaAltaCircuitoComponent},
    {path:'circuitos/alta',component:FichaAltaCircuitoComponent},
    {path:'circuitos/lista/porTramite/:idTramite',component:BuscadorCircuitosComponent},
    {path:'circuitos/lista',component:BuscadorCircuitosComponent},
    {path:'',component:ListadoTramitesGeneralesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionCircuitosTramitacionRouteModule { }
