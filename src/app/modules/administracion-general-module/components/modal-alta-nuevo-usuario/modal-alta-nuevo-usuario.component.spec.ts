import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAltaNuevoUsuarioComponent } from './modal-alta-nuevo-usuario.component';

describe('ModalAltaNuevoUsuarioComponent', () => {
  let component: ModalAltaNuevoUsuarioComponent;
  let fixture: ComponentFixture<ModalAltaNuevoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAltaNuevoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAltaNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
