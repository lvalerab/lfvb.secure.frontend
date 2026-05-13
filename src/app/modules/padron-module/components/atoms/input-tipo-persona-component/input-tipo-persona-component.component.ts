import { Component,model,Input } from '@angular/core';
import { TipoPersonaModel } from '@app/data/interfaces/Censo/TipoPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-input-tipo-persona-component',
  standalone: false,
  templateUrl: './input-tipo-persona-component.component.html',
  styleUrl: './input-tipo-persona-component.component.less',
})
export class InputTipoPersonaComponentComponent {
  
  tipo=model<TipoPersonaModel|null|undefined>(undefined);

  @Input()
  Label:string="Tipo persona";

  @Input()
  SoloLectura:boolean=false;

  tipos:TipoPersonaModel[]=[];

  constructor(private csServ:CensoService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.csServ.TiposPersona().subscribe({
      next:(values)=>{
        this.tipos=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Lista de tipos de persona',detalle:`No se ha podido obtener los tipos de personas, causa: ${error.message}`});
      }
    });
  }

}
