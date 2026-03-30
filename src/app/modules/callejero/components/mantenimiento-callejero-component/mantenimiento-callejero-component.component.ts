import { Component, WritableSignal, signal } from '@angular/core';
import { CallejeroModel } from '@app/data/interfaces/Callejero/CallejeroModel';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BuscadorCallejeroComponent } from '../buscador-callejero/buscador-callejero.component';
import { BuscadorEntidadesTerritorialesComponentComponent } from '../buscador-entidades-territoriales-component/buscador-entidades-territoriales-component.component';

@Component({
  selector: 'app-mantenimiento-callejero-component',
  standalone: false,
  templateUrl: './mantenimiento-callejero-component.component.html',
  styleUrl: './mantenimiento-callejero-component.component.less',
  providers:[DialogService]
})
export class MantenimientoCallejeroComponentComponent {
  menu:WritableSignal<MegaMenuItem[]>=signal([]);

  objVisible:WritableSignal<string|null>=signal(null);

  via:CallejeroModel={
      id:null,
      entidadTerritorial:null,
      tipoVia:null,
      nombre:"",
      calleSuperior:null,
      callesInferiores:[]
    };
  entidad:EntidadTerritorialModel={
      id:null,
      padre:null,
      tipo:null,
      nombre:null
    };

  ref:DynamicDialogRef|undefined;

  constructor(private clsServ:CallejeroService,
              private msg:ToastService,
              private dlg:DialogService
  ) {

  }

  ngOnInit() {
    this.configurarMenu();
  }

  configurarMenu() {
    let aux:MegaMenuItem[]=[];
    let aoo:MenuItem[];

    /////////////////////////////////////////////////
    // Menu mantenimineto del callejero
    /////////////////////////////////////////////////
    let clj:MegaMenuItem={
      label:"Callejero",
      icon:"pi pi-address-book",
      items:[]
    };

    
    aoo=[];
    aoo.push({
      label:"Acciones simples",
      items:[
        {
          label:"Buscar via",
          icon:"pi pi-search",
          command:()=>this.BuscarVia()    
        },
        {
          label:"Nueva via",
          icon:"pi pi-file-plus",
          command:()=>this.NuevaVia()
        }
      ]
    })    
    aoo.push({
      label:"Importador",
      items:[
        {
          label:"Desde fichero excel",
          icon:"pi pi-file-excel"
        },
        {
          label:"Desde fichero csv",
          icon:"pi pi-file-import"
        },
        {
          label:"Rellenar tabla",
          icon:"pi pi-table"
        }
      ]
    })
    clj.items=[];
    clj.items.push(aoo);

    
    /////////////////////////////////////////////////
    // Menu mantenimineto de entidades
    /////////////////////////////////////////////////

    let ent:MegaMenuItem={
      label:"Entidades territoriales"
    }
    aoo=[];
    aoo.push({
      label:"Acciones simples",
      items:[
        {
          label:"Buscar entidad",
          icon:"pi pi-search",
          command:()=>this.BuscarEntidadTerritorial()
        },
        {
          label:"Nueva entidad",
          icon:"pi pi-file-plus",
          command:()=>this.NuevaEntidadTerritorial()
        }
      ]
    })
    aoo.push({
      label:"Importador",
      items:[
        {
          label:"Desde fichero excel",
          icon:"pi pi-file-excel"
        },
        {
          label:"Desde fichero csv",
          icon:"pi pi-file-import"
        },
        {
          label:"Rellenar tabla",
          icon:"pi pi-table"
        }
      ]
    })
    ent.items=[
      aoo
    ];
    /////////////////////////////////////////////////
    // Menu mantenimineto de maestros (vias, tipos de entidades, etcc.)
    /////////////////////////////////////////////////

    let mae:MegaMenuItem={
      label:"Maestros"
    }
    aoo=[];
    aoo.push({
      label:"Tipos de vias",
      items:[
        {
          label:"Administrar"
        }
      ]
    });
    aoo.push({
      label:"Tipos entidades territoriales",
      items:[
        {
          label:"Administrar"
        }
      ]
    });

    mae.items=[
      aoo
    ];

    aux.push(clj);    
    aux.push(ent);
    aux.push(mae);
    this.menu.set(aux);
  }



  BuscarVia() {
    if(this.ref) {
      this.ref.close();
      this.ref=undefined;
    }
    this.ref=this.dlg.open(BuscadorCallejeroComponent,{
      width:"60vw",
      modal:true,
      maximizable:true,
      closable:true
    });
    this.ref.onClose.subscribe((via)=>{
      this.entidad={
      id:null,
      padre:null,
      tipo:null,
      nombre:null
    };
      this.via=via;
      this.objVisible.set("VIA");
    });
    
  }

  NuevaVia() {
    this.entidad={
      id:null,
      padre:null,
      tipo:null,
      nombre:null
    };
    this.via={
      id:null,
      entidadTerritorial:null,
      tipoVia:null,
      nombre:"",
      calleSuperior:null,
      callesInferiores:[]
    };
    this.objVisible.set("VIA");
  }

  BuscarEntidadTerritorial() {
    if(this.ref) {
      this.ref.close();
      this.ref=undefined;
    }
    this.ref=this.dlg.open(BuscadorEntidadesTerritorialesComponentComponent,{
      width:"60vw",
      modal:true,
      maximizable:true,
      closable:true
    });
    this.ref.onClose.subscribe((ente)=>{
      this.via={
        id:null,
        entidadTerritorial:null,
        tipoVia:null,
        nombre:"",
        calleSuperior:null,
        callesInferiores:[]
      };
      this.entidad=ente;
      this.objVisible.set("ENT");
    });
  }

  NuevaEntidadTerritorial() {
    this.via={
      id:null,
      entidadTerritorial:null,
      tipoVia:null,
      nombre:"",
      calleSuperior:null,
      callesInferiores:[]
    };
    this.entidad={
      id:null,
      padre:null,
      tipo:null,
      nombre:null
    };
    this.objVisible.set("ENT");
  }
}
