import { Component,model, Input } from '@angular/core';
import { TipoIdentificacionPersonaModel } from '@app/data/interfaces/Censo/TipoIdentificacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-input-tipo-identificador-persona-component',
  standalone: false,
  templateUrl: './input-tipo-identificador-persona-component.component.html',
  styleUrl: './input-tipo-identificador-persona-component.component.less',
})
export class InputTipoIdentificadorPersonaComponentComponent {

  tipo=model<TipoIdentificacionPersonaModel|null|undefined>(undefined);

  @Input()
  SoloLectura:boolean=false;

  @Input()
  Label:string="Tipo identificación";

  tipos:TipoIdentificacionPersonaModel[]=[];

  constructor(private csServ:CensoService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.csServ.TiposIdentificadores().subscribe({
      next:(values)=>{
        this.tipos=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de tipos de identificadores de persona',detalle:`No se ha podido obtener los tipos de indentificadores de personas, causa: ${error.message}`});
      }
    });
  }

}
