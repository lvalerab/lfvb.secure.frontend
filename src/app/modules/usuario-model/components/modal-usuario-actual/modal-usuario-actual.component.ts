import { Component,computed,OnDestroy,Signal,signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';
import { AuthService } from '@app/shared/services/AuthService';
import { ToastService } from '@app/shared/services/ToastService';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-usuario-actual',
  standalone: false,
  templateUrl: './modal-usuario-actual.component.html',
  styleUrl: './modal-usuario-actual.component.less',
  providers:[DialogService]
})
export class ModalUsuarioActualComponent implements OnDestroy {
  usuario:Signal<UsuarioModel|null>=signal(null);
  avatar:WritableSignal<string|null>=signal(null);
  OnCuandoCambiaUsuario=toObservable(this.usuario).subscribe((usuario)=>this.CuandoCambiaUsuario(usuario));

  constructor(private authServ:AuthService,
              private dlg:DialogService,
              private prop:PropiedadesApiService,
              private msg:ToastService,
              private ref:DynamicDialogRef
  ) {
    this.usuario=computed(()=>this.authServ.usuario());
  }

  CuandoCambiaUsuario(user:UsuarioModel|null) {
    this.prop.ConsultaPropiedadesElementos({
      idElementos:[this.usuario()?.id??""],
      codigoPropiedad:["IMG_USER","RIMG_USER"]
    }).subscribe({
      next:(props)=>{
        let img=props.filter(p=>p.propiedad?.codigo=="IMG_USER");
        if(img && img.length>0) {
          let valor=(img[0].valores && img[0].valores.length>0?img[0].valores[0].texto:"");
          this.avatar.set(valor);
        } else {
           img=props.filter(p=>p.propiedad?.codigo=="RIMG_USER");
           if(img && img.length>0) {
             let valor=(img[0].valores && img[0].valores.length>0?img[0].valores[0].texto:"");
             this.avatar.set(valor);
           }
        }
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:"error",titulo:'Obtención avatar usuario',detalle:`No se ha podido obtener el avatar del usuario, causa: ${err}`});
      }
    })
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.destroy();
    }
  }

  CerrarDialogo() {
    if(this.ref) {
      this.ref.close();
    }
  }
}
