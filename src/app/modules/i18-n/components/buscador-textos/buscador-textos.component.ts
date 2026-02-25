import { Component, WritableSignal,signal, Input, Output } from '@angular/core';
import { IdiomaModel } from '@data/interfaces/i18N/IdiomaModel';
import { TextoModel } from '@data/interfaces/i18N/Textos/TextoModel';
import { i18NService } from '@data/services/api/i18NService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { I18NGlobalService } from '../../services/I18NGlobalService';
import { BusquedaTextoModel } from '@app/data/interfaces/i18N/Textos/BusquedaTextoModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditorTextosIdiomasComponent } from '../editor-textos-idiomas/editor-textos-idiomas.component';
import { constantes } from 'src/const/constantes';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { text } from 'd3';


@Component({
  selector: 'app-buscador-textos',
  standalone: false,
  templateUrl: './buscador-textos.component.html',
  styleUrl: './buscador-textos.component.less',
  providers:[DialogService]
})
export class BuscadorTextosComponent {

    @Input()
    titulo:string="Busqueda de textos";

    @Input()
    seleccion:boolean=false;

    //@Output() onCuandoSeleccionaTexto=new EventEmitter<any>();

    opciones:WritableSignal<MenuItem[]|undefined>=signal(undefined);

    filtros:BusquedaTextoModel={
      busqueda:"",
      matchExacto:true,
      idiomas:[]
    };
    panel={
      panel1:{
        collapsed:true
      },
      panel2:{
        collapsed:false
      }
    }

    idiomas:IdiomaModel[]=[];

    idiomasFiltro:IdiomaModel[]=[];
    textoFiltro:string="";

    idiomasMostrados:IdiomaModel[]=[];

    resultado:TextoModel[]=[];

    buscado:boolean=false;

    ref:DynamicDialogRef|undefined;

    constructor(private i18nServ:i18NService,
                private i18nGlb:I18NGlobalService,
                private msg:ToastService,
                private dlg:DialogService,
                //private rdl:DynamicDialogRef,
                private snt:DomSanitizer
    ) {

    }

    ngOnInit() {
      this.GetListaIdiomas();
      this.panel.panel1.collapsed=true;
      this.panel.panel2.collapsed=false;
      this.PonerOpciones();
    }

    PonerOpciones() {
      let opc:MenuItem[]=[];

      opc.push({
        label:"Nuevo texto",
        icon:"pi pi-pen-to-square",
        command:()=>this.NuevoTexto()
      });

      opc.push({
        separator:true
      });

      opc.push({
        label:"Buscar",
        icon:"pi pi-search",        
        command:()=>this.Buscar()
      })

      this.opciones.set(opc);
    }

    GetListaIdiomas() {
      this.i18nServ.ListaTodos().subscribe({
        next:(values)=>{
          this.idiomas=values;
          this.idiomasMostrados=this.idiomas.filter(id=>id.codigo==this.i18nGlb.idioma()?.codigo);
          this.idiomasFiltro=this.idiomas.filter(id=>id.codigo==this.i18nGlb.idioma()?.codigo);
         },
        error:(error)=>this.msg.mensaje.set({tipo:'error',titulo:'Lista de idiomas',detalle:`No se ha podido obtener el listado de idiomas, causa: ${error.message}`})
      })
    }

    GetTexto(codIdio:string,texto:TextoModel):SafeHtml {
      let aux=texto.textos?.filter(tx=>tx.idioma?.codigo==codIdio);
      
      return this.snt.bypassSecurityTrustHtml(aux && aux.length>0?aux[0].texto??"":"");
    }

    Buscar() {
      debugger;
      let auxIdio:string[]=[];
      this.idiomasFiltro.forEach(element => {
        auxIdio.push(element.codigo);
      });
      this.filtros.idiomas=auxIdio;
      this.i18nServ.TextoBusquedaModelo(this.filtros).subscribe({
        next:(resultados)=>{
          this.resultado=resultados;
          this.panel.panel1.collapsed=true;
          this.panel.panel2.collapsed=false;
          this.buscado=true;
        },
        //error:(error)=>this.msg.mensaje.set({tipo:'error',titulo:'Busqueda de textos',detalle:`No se ha podido buscar los textos, causa: ${error.message}`})
      });
    }


    AbrirFichaEditarTexto(texto:TextoModel, titulo:string) {
      this.ref=this.dlg.open(EditorTextosIdiomasComponent,{
        maximizable:true,
        closable:true,
        modal:true,
        width:'50vw',
        inputValues:{
          texto:texto,
          titulo:titulo,
          cerrarAlGuardar:true
        }
      });
      this.ref.onClose.subscribe(()=>{
        this.Buscar()
      });
    }

    NuevoTexto() {
      this.AbrirFichaEditarTexto({id:constantes.guid.zero,variables:[],textos:[],columnas:undefined},"Nuevo texto");      
    }

    ModificarTexto(texto:TextoModel) {
      this.AbrirFichaEditarTexto(texto,"Modificar texto");
    }
}
