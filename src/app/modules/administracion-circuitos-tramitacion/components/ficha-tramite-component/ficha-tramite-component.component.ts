import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { TramiteModel } from '@data/interfaces/Circuitos/TramiteModel';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ficha-tramite-component',
  standalone: false,
  templateUrl: './ficha-tramite-component.component.html',
  styleUrl: './ficha-tramite-component.component.less'
})
export class FichaTramiteComponentComponent {
    tramite:TramiteModel={
      id:"",
      nombre:"",
      descripcion:"",
      normativa:""
    };

    opciones:MenuItem[]=[];

    constructor(private admCircSer:AdministracionCircuitosTramitacionService,
                private route:ActivatedRoute,
                private msg:ToastService
    ) {

    }

    ngOnInit() {
      this.route.paramMap.subscribe(params=>{
          var id=params.get("id");          
          if(id!=null) {
            this.getTramite(id);
          }
        }
      )
    }

    getTramite(id:string) {
      this.admCircSer.GetTramite(id).subscribe({
        next:(value=>{
          let aux:TramiteModel=value??{id:"",nombre:"",descripcion:"",normativa:""};
          this.tramite=aux;
        }),
        error:(error=>{
          this.msg.mensaje.set({titulo:"Obtención del tramite",detalle:"No es posible obtener el tramite indicado",tipo:"error"});
        })
      })
    }


}
