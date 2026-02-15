import { Component,Input, signal, WritableSignal } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ficha-idioma',
  standalone: false,
  templateUrl: './ficha-idioma.component.html',
  styleUrl: './ficha-idioma.component.less',
})
export class FichaIdiomaComponent {

  @Input()
  idioma:IdiomaModel={
    codigo:"",
    nombre:"",
    orden:null,
    componentes:[],
    multiple:false,
    propiedades:[]
  };

  @Input()
  nuevo:Boolean=false;

  ident:string|undefined;

  idioma1:IdiomaModel|undefined;
  idioma2:IdiomaModel|undefined;

  idiomas:IdiomaModel[]=[];

  menus:MenuItem[]=[];

  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

  constructor(private i18nSrv:i18NService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.ConfiguraOpcionesMenu();
    this.GetListaIdiomasSimples();
    if(this.idioma.multiple) {
      if(this.idioma.componentes.length<2) {
        this.idioma.componentes[0]={
          codigo:"",
          nombre:"",
          orden:null,
          componentes:[],
          multiple:false,
          propiedades:[]
        };
        this.idioma.componentes[1]=
          {
          codigo:"",
          nombre:"",
          orden:null,
          componentes:[],
          multiple:false,
          propiedades:[]
        };        
      } 
      this.idioma1=this.idioma.componentes[0];
      this.idioma2=this.idioma.componentes[1];
    }
    if(!this.nuevo) {
      this.i18nSrv.Ident(this.idioma.codigo).subscribe({
        next:(value)=>{
          this.ident=value;
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Obtención del id del idioma",detalle:`No se ha podido obtener el identificador del idioma, causa: ${error.message}`});
        }
      });
    };
  }

  GetListaIdiomasSimples() {
    this.i18nSrv.Lista().subscribe({
      next:(values)=>{
        this.idiomas=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Lista de idiomas',detalle:`No se puede obtener el listado de idiomas simples, causa: ${error.message}`});
      }
    });
  }

  ConfiguraOpcionesMenu() {
    this.menus=[];
    this.menus.push({
      icon:'pi pi-save',
      title:'Guardar datos idioma',
      command:()=>{this.GuardaIdioma();}
    });
  }

  GuardaIdioma() {
    if(this.idioma.multiple) {
      this.idioma.componentes=[];
      if(this.idioma1) {
        this.idioma1.orden=1;
        this.idioma.componentes.push(this.idioma1);
      }
      if(this.idioma2) {
        this.idioma2.orden=2;
        this.idioma.componentes.push(this.idioma2);
      }
    }
    if(this.idioma.codigo!="" && this.idioma.nombre!="" && (!this.idioma.multiple || (this.idioma.multiple && this.idioma.componentes.length==2))) {
      if(this.nuevo) {
        this.i18nSrv.Alta(this.idioma).subscribe({
          next:(value)=>{
            this.idioma=value;
            this.msg.mensaje.set({tipo:'success',titulo:'Idioma guardado', detalle:'Se ha guardado con éxito'});
          },
          error:(error)=> {
            this.msg.mensaje.set({tipo:'error',titulo:'Idioma no guardado', detalle:`Ha ocurrido un error al guardar el idioma, causa: ${error.message}`});
          }
        });
      } else {
        this.i18nSrv.Modifica(this.idioma).subscribe({
          next:(value)=>{
            this.idioma=value;
            this.msg.mensaje.set({tipo:'success',titulo:'Idioma guardado', detalle:'Se ha guardado con éxito'});
          },
          error:(error)=> {
            this.msg.mensaje.set({tipo:'error',titulo:'Idioma no guardado', detalle:`Ha ocurrido un error al guardar el idioma, causa: ${error.message}`});
          }
        });
      }
    } else {
      this.msg.mensaje.set({tipo:"warm",titulo:"Información incorrecta",detalle:"Falta rellenar los campos"});
    }
  }


  CuandoSeleccionaPropiedad(propiedad:PropiedadModel|null) {
    this.PropiedadSeleccionada.set(propiedad);
  }
}
