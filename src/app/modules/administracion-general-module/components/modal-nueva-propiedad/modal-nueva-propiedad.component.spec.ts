import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaPropiedadComponent } from './modal-nueva-propiedad.component';

describe('ModalNuevaPropiedadComponent', () => {
  let component: ModalNuevaPropiedadComponent;
  let fixture: ComponentFixture<ModalNuevaPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNuevaPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
