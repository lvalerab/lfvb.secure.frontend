import { Component,WritableSignal,signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CircuitoModel } from '@app/data/interfaces/Circuitos/CircuitoModel';
import { FiltroCircuitoModel } from '@app/data/interfaces/Circuitos/FiltroCircuitoModel';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-buscador-circuitos',
  standalone: false,
  templateUrl: './buscador-circuitos.component.html',
  styleUrl: './buscador-circuitos.component.less'
})
export class BuscadorCircuitosComponent {
    filtro:WritableSignal<FiltroCircuitoModel>=signal({
      idTramite:null,
      activo:true,
      nombre:"",
      page:0,
      regs:0
    });

    circuitos:CircuitoModel[]=[];

    opciones:MenuItem[]=[];

    constructor(private route:ActivatedRoute,
                private admCirc:AdministracionCircuitosTramitacionService,
                private msg:ToastService
    ) {
      toObservable(this.filtro).subscribe((fil)=>{
        this.getCircuitos();
      });
    }

    ngOnInit() {
      this.getOpciones();
      this.route.paramMap.subscribe(params=>{
        var idTramite=params.get("idTramite");
        if(idTramite) {
          this.filtro().idTramite=idTramite;          
        }             
      });      
    }

    getOpciones() {
      this.opciones.push({
        icon:'pi pi-plus',
        label:'Alta de circuito',
        routerLink:'/circuitos/administracion/circuitos/alta'
      });
    }

    getCircuitos() {
      this.admCirc.ListaCircuitos(this.filtro()).subscribe({
        next:(values)=>{
          this.circuitos=values??[];
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Obteniendo los circuitos',detalle:`No se han podido obtener los circuitos, causa: ${err.message}`});
        }
      });
    }
}
