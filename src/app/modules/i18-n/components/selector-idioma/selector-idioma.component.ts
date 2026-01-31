import { Component, Input, Output,WritableSignal, signal } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { environment } from '@environments/environment';
import { I18NGlobalService } from '../../services/I18NGlobalService';
import { ToastService } from '@app/shared/services/ToastService';
import { EventEmitter } from 'stream';
import { toObservable } from '@angular/core/rxjs-interop';
import { KeyValueModel } from '@app/data/interfaces/Utils/KeyValueModel';
import { SelectChangeEvent } from 'primeng/select';



@Component({
  selector: 'app-selector-idioma',
  standalone: false,
  templateUrl: './selector-idioma.component.html',
  styleUrl: './selector-idioma.component.less',
})
export class SelectorIdiomaComponent {
  @Input()
  global:boolean=false;

  @Input()
  codigo:string=environment.config.I18N.idioma.defecto;

  idioma:WritableSignal<IdiomaModel|null>=signal(null);

  lista:WritableSignal<IdiomaModel[]>=signal([]);

  selectItems:KeyValueModel[]=[];

  selectedItem:KeyValueModel|null=null;

  //@Output() CuandoSeleccionaIdioma=new EventEmitter<any>;


  constructor(private i18NServ:i18NService,
              private I18NGlbSerb:I18NGlobalService,
              private msg:ToastService
  ) {
    toObservable(this.idioma).subscribe(value=>{
      this.selectedItem={
        key:value?.codigo,
        value:value?.nombre,
        data:null
      };
      if(this.global) {
        if(this.I18NGlbSerb.idioma()?.codigo!=value?.codigo) {
          this.I18NGlbSerb.idioma.set(value);
        }
      }      
    });
    toObservable(this.lista).subscribe(values=>{
      this.selectItems=[];
      values.forEach(id => {
        this.selectItems.push({
          key:id.codigo,
          value:id.nombre,
          data:null
        });
      });
    });        
  }

  ngOnInit() {
    if(this.global) {
      this.codigo=this.I18NGlbSerb.idioma()?.codigo??environment.config.I18N.idioma.defecto;
    }
    this.getIdiomas();
    this.getIdioma();
  }

  getIdioma() {
    this.i18NServ.Detalle(this.codigo).subscribe({
        next:(value)=> {
          this.idioma.set(value);         
        },
        error:(error)=> {
          this.msg.mensaje.set({tipo:'error',titulo:'Obtención del idioma',detalle:`No se ha podido obtener el idioma seleccionado, causa: ${error.message}`});
        }
      });
  }

  getIdiomas() {
    this.i18NServ.Lista().subscribe({
      next:(value)=>{
        this.lista.set(value);
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Obtención listado de idiomas', detalle:`No se ha podido obtener el listado de idiomas, causa: ${error.message}`});
      }
    });
  }

  CuandoSeleccionaIdioma(event:SelectChangeEvent) {
    debugger;
    this.selectedItem=this.selectItems.filter(x=>x.value==event.value)[0];
    this.codigo=this.selectedItem?.key;
    this.getIdioma();
  }
}
