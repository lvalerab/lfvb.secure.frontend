import { Component,computed,OnDestroy,Signal } from '@angular/core';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AuthService } from '@app/shared/services/AuthService';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-usuario-actual',
  standalone: false,
  templateUrl: './modal-usuario-actual.component.html',
  styleUrl: './modal-usuario-actual.component.less',
  providers:[DialogService]
})
export class ModalUsuarioActualComponent implements OnDestroy {
  usuario:Signal<UsuarioModel|null>;

  constructor(private authServ:AuthService,
              private dlg:DialogService,
              private ref:DynamicDialogRef
  ) {
    this.usuario=computed(()=>this.authServ.usuario());
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
