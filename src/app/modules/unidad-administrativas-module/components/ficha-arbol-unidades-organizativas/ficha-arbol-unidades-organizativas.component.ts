import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-ficha-arbol-unidades-organizativas',
  standalone: false,
  templateUrl: './ficha-arbol-unidades-organizativas.component.html',
  styleUrl: './ficha-arbol-unidades-organizativas.component.less',
})
export class FichaArbolUnidadesOrganizativasComponent {

    constructor(private msg:ToastService) {

    }

    ngOnInit() {
      
    }
}
