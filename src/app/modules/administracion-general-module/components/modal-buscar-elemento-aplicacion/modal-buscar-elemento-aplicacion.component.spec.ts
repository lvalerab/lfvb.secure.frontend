import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscarElementoAplicacionComponent } from './modal-buscar-elemento-aplicacion.component';

describe('ModalBuscarElementoAplicacionComponent', () => {
  let component: ModalBuscarElementoAplicacionComponent;
  let fixture: ComponentFixture<ModalBuscarElementoAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBuscarElementoAplicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBuscarElementoAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
