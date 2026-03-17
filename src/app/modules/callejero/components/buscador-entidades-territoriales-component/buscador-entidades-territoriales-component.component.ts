import { Component, Input, Output, EventEmitter,WritableSignal,signal } from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { FiltroBusquedaEntidadTerritorialModel } from '@app/data/interfaces/Callejero/FiltroBusquedaEntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { TipoEntidadTerritorialModel } from '@data/interfaces/Callejero/TipoEntidadTerritorialModel';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-buscador-entidades-territoriales-component',
  standalone: false,
  templateUrl: './buscador-entidades-territoriales-component.component.html',
  styleUrl: './buscador-entidades-territoriales-component.component.less',
})
export class BuscadorEntidadesTerritorialesComponentComponent {
  
  @Input()
  multiple:boolean=false;
  
  @Input()
  filtro:FiltroBusquedaEntidadTerritorialModel={
    nombre:"",
    padres:[],
    tiposEntidades:[]
  }

  opciones:WritableSignal<MenuItem[]>=signal([]);

  resultados:EntidadTerritorialModel[]=[];

  constructor(private clServ:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.ConfigurarMenu();
  }

  ConfigurarMenu() {
    let aux:MenuItem[]=[];
    aux.push({
      label:"Buscar",
      icon:"pi pi-search",
      command:()=>this.Buscar()
    });

    this.opciones.set(aux);
  }

  Buscar() {
    this.clServ.BuscarEntidadesTerritoriales(this.filtro).subscribe({
      next:(resultado)=>{
        this.resultados=resultado;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Busqueda de entidades territoriales',detalle:`No se ha podido buscar las entiedades territoriales, causa: ${error.message}`});
      }
    });
  }

  onCuandoCambiaTiposEntidades(tipos:TipoEntidadTerritorialModel[]|null) {
    this.filtro.tiposEntidades=tipos;
  }
}
