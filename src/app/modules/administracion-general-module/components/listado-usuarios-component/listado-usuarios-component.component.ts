import { Component } from '@angular/core';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-listado-usuarios-component',
  standalone: false,
  templateUrl: './listado-usuarios-component.component.html',
  styleUrl: './listado-usuarios-component.component.less'
})
export class ListadoUsuariosComponentComponent {
  
  listadoUsuarios:Array<UsuarioModel>=[];
  listadoUSuariosFiltrado:Array<UsuarioModel>=[];
  
  
  constructor(private admUsuarios:AdministracionUsuariosService, 
              private msg:ToastService) {

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
}
