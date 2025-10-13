import { Component } from '@angular/core';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { ToastService } from '@app/shared/services/ToastService';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalAltaNuevoUsuarioComponent } from '../modal-alta-nuevo-usuario/modal-alta-nuevo-usuario.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-listado-usuarios-component',
  standalone: false,
  templateUrl: './listado-usuarios-component.component.html',
  styleUrl: './listado-usuarios-component.component.less',
  providers:[DialogService]
})
export class ListadoUsuariosComponentComponent {
  
  listadoUsuarios:Array<UsuarioModel>=[];
  listadoUSuariosFiltrado:Array<UsuarioModel>=[];
  FiltroUsuario:string="";
  FiltroNombre:string="";

  filtro={
    PorNombre:"",
    PorUsuario:""
  }
  
  OpcionesUsuario:MenuItem[]=[];
  
  constructor(private admUsuarios:AdministracionUsuariosService, 
              private msg:ToastService,
              private dlg:DialogService
            ) {

  }

  ngOnInit() {
    this.GetListaUsuarios();
    this.ConfiguraOpcionesUsuario();
  }

  ConfiguraOpcionesUsuario() {
    this.OpcionesUsuario=[];
    this.OpcionesUsuario.push({
      label:'Nuevo usuario',
      icon:'pi pi-plus',
      command:(event)=>this.MostrarDialogoCrearUsuario()
    });
  }

  GetListaUsuarios():void {
    this.admUsuarios.Lista(0,0).subscribe((lista)=>{
      this.listadoUsuarios=lista;
      this.listadoUSuariosFiltrado=lista;
    },error=>{
      if(error.status+""=="401") {
        this.msg.mensaje.set({tipo:'error',titulo:'Usuario sin permisos',detalle:'El usuario actual no tiene permisos para listar los usuarios de la maquina. Pongase en contacto con el administrador'});
      }
    });
  }

  OnAplicaFiltro() {
    debugger;
    this.listadoUSuariosFiltrado=this.listadoUsuarios;
    if(this.filtro.PorNombre!="") {
      this.listadoUSuariosFiltrado=this.listadoUSuariosFiltrado.filter(x=>(x.apellido1+" "+x.apellido2+", "+x.nombre).indexOf(this.filtro.PorNombre)>=0);
    }
    if(this.filtro.PorUsuario) {
      this.listadoUSuariosFiltrado=this.listadoUSuariosFiltrado.filter(x=>(x.usuario??"").indexOf(this.filtro.PorUsuario??"")>=0);
    }
  }


  MostrarDialogoCrearUsuario() {
    this.dlg.open(ModalAltaNuevoUsuarioComponent,{ 
      header:"Alta de usuario",     
      modal:true,
      width:'50vm',
      contentStyle:{overflow:'auto'},
      appendTo:'body',
      closable:true
    });
  }
}
