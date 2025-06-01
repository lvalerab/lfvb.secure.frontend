import { Component } from '@angular/core';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { ToastService } from '@app/shared/services/ToastService';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalAltaNuevoUsuarioComponent } from '../modal-alta-nuevo-usuario/modal-alta-nuevo-usuario.component';

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
  
  
  constructor(private admUsuarios:AdministracionUsuariosService, 
              private msg:ToastService,
              private dlg:DialogService
            ) {

  }

  ngOnInit() {
    this.GetListaUsuarios();
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

  OnAplicaFiltro(event:Event) {
    this.listadoUSuariosFiltrado=this.listadoUsuarios.filter(x=>(x.usuario!=null && x.usuario?.indexOf(this.FiltroUsuario)>=0) || x.usuario==null || (x.apellido1+" "+x.apellido2+", "+x.nombre).indexOf(this.FiltroNombre)>=0);
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
