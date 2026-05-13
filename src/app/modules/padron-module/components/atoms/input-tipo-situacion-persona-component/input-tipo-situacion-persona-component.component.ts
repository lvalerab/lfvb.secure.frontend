import { Component,model, Input } from '@angular/core';
import { TipoSituacionPersonaModel } from '@app/data/interfaces/Censo/TipoSituacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-input-tipo-situacion-persona-component',
  standalone: false,
  templateUrl: './input-tipo-situacion-persona-component.component.html',
  styleUrl: './input-tipo-situacion-persona-component.component.less',
})
export class InputTipoSituacionPersonaComponentComponent {

  tipo=model<TipoSituacionPersonaModel|null|undefined>(undefined);

  @Input()
  SoloLectura:boolean=false;

  @Input()
  Label:string="Tipo de situación personal";

  tipos:TipoSituacionPersonaModel[]=[];

  constructor(private csServ:CensoService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.csServ.TiposSituacionesPersonales().subscribe({
      next:(values)=>{
        this.tipos=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Lista de tipos de situaciones personales',detalle:`No es posible obtener el listado de tipos de situaciones personales, causa: ${error.message}`});
      }
    });
  }
}
