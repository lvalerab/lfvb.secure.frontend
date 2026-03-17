import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MantenimientoCallejeroComponentComponent } from "./components/mantenimiento-callejero-component/mantenimiento-callejero-component.component";

const routes: Routes=[
    {path:'admin',component:MantenimientoCallejeroComponentComponent}
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class routeCallejeroModule {

}