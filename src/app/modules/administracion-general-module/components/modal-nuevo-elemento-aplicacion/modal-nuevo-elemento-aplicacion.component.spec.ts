import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoElementoAplicacionComponent } from './modal-nuevo-elemento-aplicacion.component';

describe('ModalNuevoElementoAplicacionComponent', () => {
  let component: ModalNuevoElementoAplicacionComponent;
  let fixture: ComponentFixture<ModalNuevoElementoAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNuevoElementoAplicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevoElementoAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
