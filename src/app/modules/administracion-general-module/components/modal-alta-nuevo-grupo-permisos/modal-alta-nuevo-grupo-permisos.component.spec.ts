import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAltaNuevoGrupoPermisosComponent } from './modal-alta-nuevo-grupo-permisos.component';

describe('ModalAltaNuevoGrupoPermisosComponent', () => {
  let component: ModalAltaNuevoGrupoPermisosComponent;
  let fixture: ComponentFixture<ModalAltaNuevoGrupoPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAltaNuevoGrupoPermisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAltaNuevoGrupoPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
