import { Component, model,Input } from '@angular/core';
import { TipoRelacionPersonaModel } from '@app/data/interfaces/Censo/TipoRelacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-input-tipo-relacion-persona-component',
  standalone: false,
  templateUrl: './input-tipo-relacion-persona-component.component.html',
  styleUrl: './input-tipo-relacion-persona-component.component.less',
})
export class InputTipoRelacionPersonaComponentComponent {

  tipo=model<TipoRelacionPersonaModel|null|undefined>(undefined);

  @Input()
  SoloLectura:boolean=false;

  @Input()
  Label:string="Tipo relación personal";

  tipos:TipoRelacionPersonaModel[]=[];

  constructor(private csServ:CensoService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.csServ.TiposRelacionesPersonales().subscribe({
      next:(values)=>{
        this.tipos=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Tipos de relaciones personales',detalle:`No es posible obtener el listado de tipos de relaciones personales, causa: ${error.message}`});
      }
    });
  }

}
