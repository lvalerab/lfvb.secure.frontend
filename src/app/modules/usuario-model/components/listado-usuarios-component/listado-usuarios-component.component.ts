import { Component } from '@angular/core';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';

@Component({
  selector: 'app-listado-usuarios-component',
  standalone: false,
  templateUrl: './listado-usuarios-component.component.html',
  styleUrl: './listado-usuarios-component.component.less'
})
export class ListadoUsuariosComponentComponent {
  
  listadoUsuarios:Array<UsuarioModel>=[];
  listadoUSuariosFiltrado:Array<UsuarioModel>=[];
  
  
  constructor() {

  }

  ngOnInit() {

  }
}
