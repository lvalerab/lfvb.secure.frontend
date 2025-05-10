import { Component,Output } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import {UsuarioApiService} from '@data/services/api/UsuarioApiService';

@Component({
  selector: 'app-buscador-elementos-component',
  standalone: false,
  templateUrl: './buscador-elementos-component.component.html',
  styleUrl: './buscador-elementos-component.component.less'
})
export class BuscadorElementosComponentComponent {
    @Output()
    ElementoSeleccionado:ElementoModel|null=null;

    Elementos:Array<ElementoModel>=[];  
    ElementosFiltrados:Array<ElementoModel>=[];  

    //Filtros
    FiltroCodigo:string|null=null;
    FiltroNombre:string|null=null;

    constructor(private apiPermisos:UsuarioApiService) {}

    ngOnInit() {
      this.apiPermisos.Elementos().subscribe(e=>{
        this.Elementos=e;
        this.ElementosFiltrados=this.Elementos;
      },error=>{

      });
    }

    CambiaPagina(evento:any) {

    }
}
