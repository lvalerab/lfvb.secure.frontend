import { Component } from '@angular/core';
import { AltaCircuitoModel } from '@app/data/interfaces/Circuitos/AltaCircuitoModel';
import { TipoElementoModel } from '@app/data/interfaces/TipoElementoModel';
import { AdministracionGruposPermisosService } from '@app/data/services/api/AdministracionGruposPermisosService';
import { CoreService } from '@app/data/services/api/CoreService';
import { ToastService } from '@app/shared/services/ToastService';
import { GrupoModel } from '@data/interfaces/GrupoModel';
import { TipoElementoAplicacionModel } from '@data/interfaces/TipoElementoAplicacionModel';

@Component({
  selector: 'app-ficha-alta-circuito',
  standalone: false,
  templateUrl: './ficha-alta-circuito.component.html',
  styleUrl: './ficha-alta-circuito.component.less'
})
export class FichaAltaCircuitoComponent {

  tiposElementos:TipoElementoModel[]=[];  

  grupos:GrupoModel[]=[];
  

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

  ngOnInit() {
    this.getAllTiposElementos();
    this.getAllGruposPermisos();
  }
}
