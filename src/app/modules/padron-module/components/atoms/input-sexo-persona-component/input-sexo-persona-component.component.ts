import { Component,model,Input } from '@angular/core';
import { TipoSexoPersonaModel } from '@app/data/interfaces/Censo/TipoSexoPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-input-sexo-persona-component',
  standalone: false,
  templateUrl: './input-sexo-persona-component.component.html',
  styleUrl: './input-sexo-persona-component.component.less',
})
export class InputSexoPersonaComponentComponent {
  
  sexo=model<TipoSexoPersonaModel|null|undefined>(null);

  @Input()
  SoloLectura:boolean=false;

  @Input()
  Label:string="Sexo";

  sexos:TipoSexoPersonaModel[]=[];

  constructor(private cnServ:CensoService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {    
    this.cnServ.TiposSexo().subscribe({
      next:(values)=>{
        this.sexos=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Tipo sexos persona',detalle:`No es posible obtener el listado de sexos, causa: ${error.message}`});
      }
    });
  }


}
