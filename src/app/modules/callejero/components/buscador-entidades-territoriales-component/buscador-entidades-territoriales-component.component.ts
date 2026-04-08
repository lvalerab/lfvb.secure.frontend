import { Component, Input, Output, EventEmitter,WritableSignal,signal, OnDestroy } from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { FiltroBusquedaEntidadTerritorialModel } from '@app/data/interfaces/Callejero/FiltroBusquedaEntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { TipoEntidadTerritorialModel } from '@data/interfaces/Callejero/TipoEntidadTerritorialModel';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-buscador-entidades-territoriales-component',
  standalone: false,
  templateUrl: './buscador-entidades-territoriales-component.component.html',
  styleUrl: './buscador-entidades-territoriales-component.component.less',
  providers:[DialogService]
})
export class BuscadorEntidadesTerritorialesComponentComponent implements OnDestroy {
  
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

  entSupSelec:EntidadTerritorialModel|undefined;


  constructor(private clServ:CallejeroService,
              private msg:ToastService,
              private dlgRef:DynamicDialogRef
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


  Seleccionar(seleccion:EntidadTerritorialModel) {
    this.dlgRef.close(seleccion);
  }

  onCuandoSeleccionaEntidadSuperior(enti:EntidadTerritorialModel|null|undefined) {
    if(enti) {
      if(this.filtro.padres==null) {
        this.filtro.padres=[];
      }
      this.filtro.padres.push(enti);
      this.entSupSelec=undefined;
    }
  }

  onEliminarEntidadSuperior(enti:EntidadTerritorialModel) {
    if(this.filtro.padres) {
      let aux=[];
      for(let i=0;i<this.filtro.padres.length;i++) {
        if(this.filtro.padres[i].id!=enti.id) {
          aux.push(this.filtro.padres[i]);
        }
      }
      if(aux.length<=0) {
        this.filtro.padres=null;
      } else {
        this.filtro.padres=aux;
      }
    }
  }

  ngOnDestroy() {
    this.dlgRef.destroy();
  }
}
