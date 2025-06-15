import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAltaNuevaAplicacionComponent } from './modal-alta-nueva-aplicacion.component';

describe('ModalAltaNuevaAplicacionComponent', () => {
  let component: ModalAltaNuevaAplicacionComponent;
  let fixture: ComponentFixture<ModalAltaNuevaAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAltaNuevaAplicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAltaNuevaAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
