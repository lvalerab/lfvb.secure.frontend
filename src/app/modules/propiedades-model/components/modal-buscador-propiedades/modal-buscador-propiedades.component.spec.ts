import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscadorPropiedadesComponent } from './modal-buscador-propiedades.component';

describe('ModalBuscadorPropiedadesComponent', () => {
  let component: ModalBuscadorPropiedadesComponent;
  let fixture: ComponentFixture<ModalBuscadorPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBuscadorPropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBuscadorPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
