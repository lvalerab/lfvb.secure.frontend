import { Component } from '@angular/core';
import { AltaCircuitoModel } from '@data/interfaces/Circuitos/AltaCircuitoModel';
import { TipoElementoModel } from '@data/interfaces/TipoElementoModel';
import { AdministracionCircuitosTramitacionService } from '@data/services/api/AdministracionCircuitosTramitacionService';
import { AdministracionGruposPermisosService } from '@data/services/api/AdministracionGruposPermisosService';
import { CoreService } from '@app/data/services/api/CoreService';
import { ToastService } from '@shared/services/ToastService';
import { GrupoModel } from '@data/interfaces/GrupoModel';
import { ActivatedRoute,Router } from '@angular/router';
import { TramiteModel } from '@app/data/interfaces/Circuitos/TramiteModel';

@Component({
  selector: 'app-ficha-alta-circuito',
  standalone: false,
  templateUrl: './ficha-alta-circuito.component.html',
  styleUrl: './ficha-alta-circuito.component.less'
})
export class FichaAltaCircuitoComponent {

  tiposElementos:TipoElementoModel[]=[];  

  grupos:GrupoModel[]=[];
  tramites:TramiteModel[]=[];

  circuito:AltaCircuitoModel={
    tramite:{
      id:"",
      nombre:"",
      descripcion:"",
      normativa:""
    },
    nombre:"",
    descripcion:"",
    normativa:"",
    tipos:[],
    grupos:[]
  }

  constructor(private core:CoreService,
              private route:ActivatedRoute,
              private router:Router,
              private admCircServ:AdministracionCircuitosTramitacionService,
              private admGrpServ:AdministracionGruposPermisosService,
              private msg:ToastService
  ) {

  }

  getAllTiposElementos() {
    this.core.TiposElementosLista().subscribe({
      next:(values)=>{
        this.tiposElementos=values;
      },
      error:(error)=>{
        this.tiposElementos=[];
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de tipos de elementos',detalle:`No se ha podido obtener el listado de tipos de elementos, causa: ${error.message}`});
      }
    });
  }

  getAllGruposPermisos() {
    this.admGrpServ.Lista().subscribe({
      next:(grps)=>{
        this.grupos=grps;
      },
      error:(err)=>{
        this.grupos=[];
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de grupos de usuario',detalle:`No se ha podido obtener el listado de grupos de usuario, causa: ${err.message}`});
      }
    })
  }

  getTramite(id:string) {
    this.admCircServ.GetTramite(id).subscribe({
      next:(data)=>{
        this.circuito.tramite=data??{id:"",nombre:"",descripcion:"",normativa:""};
      },
      error:(err)=>{
        this.circuito.tramite={id:"",nombre:"",descripcion:"",normativa:""};
        this.msg.mensaje.set({tipo:"error",titulo:"Obtener datos del tramite",detalle:`No se ha podido obtener los datos del tramite, causa: ${err.message}`});
      }
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
          var id=params.get("idTramite");          
          if(id!=null) {
            this.getTramite(id);
          } else {
            this.admCircServ.ListaTramites().subscribe({
              next:(trams)=>{
                this.tramites=trams;
              },
              error:(err)=>{
                this.msg.mensaje.set({tipo:"error",titulo:"Obtener el listado de tramites",detalle:`No se ha podido obtener el listado de tramites, causa: ${err.mensaje}`});
              }
            })
          }
        }
      );
    this.getAllTiposElementos();
    this.getAllGruposPermisos();
  }

  GuardarDatos() {
    this.admCircServ.NuevoCircuito(this.circuito).subscribe({
      next:(NewValue)=>{
        this.msg.mensaje.set({tipo:'success',titulo:'Alta circuito',detalle:'Circuito dado de alta correctamente'});
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'danger',titulo:'Alta circuito',detalle:`No se ha podido dar de alta el circuito, causa: ${err.message}`});
      }
    });
  }
}
