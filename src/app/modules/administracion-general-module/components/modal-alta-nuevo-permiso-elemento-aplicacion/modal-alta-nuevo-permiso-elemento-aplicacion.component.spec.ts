import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAltaNuevoPermisoElementoAplicacionComponent } from './modal-alta-nuevo-permiso-elemento-aplicacion.component';

describe('ModalAltaNuevoPermisoElementoAplicacionComponent', () => {
  let component: ModalAltaNuevoPermisoElementoAplicacionComponent;
  let fixture: ComponentFixture<ModalAltaNuevoPermisoElementoAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAltaNuevoPermisoElementoAplicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAltaNuevoPermisoElementoAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
