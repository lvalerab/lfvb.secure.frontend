import { Component } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { ConsultaPermisoModel } from '@app/data/interfaces/PermisoElemento/ConsultaPermisoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { UsuarioApiService } from '@app/data/services/api/UsuarioApiService';
import { PermisosService } from '@app/shared/services/PermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-listado-idiomas',
  standalone: false,
  templateUrl: './listado-idiomas.component.html',
  styleUrl: './listado-idiomas.component.less',
})
export class ListadoIdiomasComponent {
  idiomas:IdiomaModel[]=[];
  
  Opciones:MenuItem[]=[];

  constructor(private i18NServ:i18NService,
              private msg:ToastService,
              private usrServ:UsuarioApiService,
              private permServ:PermisosService
  ) {
    toObservable(this.permServ.Permisos).subscribe((value)=>{
      debugger;
      //Cuando se establece los permisos
      this.ConfiguraMenu();
    });    
  }

  ngOnInit() {
    this.GetListaIdiomas();   
    this.GetPermisos(); 
  }

  GetPermisos() {
    let permisos:ConsultaPermisoModel[]=[
      {idApli:"ADM_IDIOMAS",idElap:"BTN_ALTA_IDIOMA",nombre:"PERMI_EJC",codigoTipoPermiso:[]},
      {idApli:"ADM_IDIOMAS",idElap:"BTN_MODIFICA_IDIOMA",nombre:"PERMI_EJC",codigoTipoPermiso:[]},
    ]

    this.permServ.ConsultaPermisos(permisos);    
  }

  PuedeVerBoton(boton:string, permiso:string) {
    return this.permServ.PuedeVer(boton,permiso);
  }

  ConfiguraMenu() {
    this.Opciones=[];    
      this.Opciones.push({
        label:'Nuevo idioma',
        icon:'pi pi-plus',
        visible:this.permServ.PuedeVer("BTN_ALTA_IDIOMA","PERMI_EJEC"),
        command:(event)=>this.MostrarDialogoIdioma()
      });
  }
 
  GetListaIdiomas() {
    this.i18NServ.ListaTodos().subscribe({
      next:(values)=>{
        this.idiomas=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Obtencion de lista de idiomas",detalle:`No se ha podido obtener el listado de idiomas, causa: ${error.message}`});
      }
    });
  }


  MostrarDialogoIdioma() {

  }
}
