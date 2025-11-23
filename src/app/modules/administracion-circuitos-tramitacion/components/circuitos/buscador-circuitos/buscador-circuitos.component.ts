import { Component,WritableSignal,signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CircuitoModel } from '@app/data/interfaces/Circuitos/CircuitoModel';
import { FiltroCircuitoModel } from '@app/data/interfaces/Circuitos/FiltroCircuitoModel';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { environment } from '@environments/environment';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-buscador-circuitos',
  standalone: false,
  templateUrl: './buscador-circuitos.component.html',
  styleUrl: './buscador-circuitos.component.less'
})
export class BuscadorCircuitosComponent {
    filtro:WritableSignal<FiltroCircuitoModel>=signal({
      idTramite:"",
      activo:true,
      nombre:"",
      page:0,
      regs:0
    });

    env:any=environment;

    circuitos:CircuitoModel[]=[];

    opciones:MenuItem[]=[];

    constructor(private route:ActivatedRoute,
                private router:Router,
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
        debugger;
        var idTramite=params.get("idTramite");
        if(idTramite) {
          this.filtro.update((f)=>{
            return f = {
              idTramite: idTramite,
              activo: true,
              nombre: "",
              page: 0,
              regs: 0
            };
            });
        }             
      });      
    }

    getOpciones() {
      this.opciones.push({
        icon:'pi pi-plus',
        label:'Alta de circuito',
        command:()=>{
          this.router.navigate([`/circuitos/administracion/circuitos/alta/${this.filtro().idTramite}`]);
        }
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
