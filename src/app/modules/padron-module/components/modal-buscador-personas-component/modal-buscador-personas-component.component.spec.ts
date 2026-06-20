import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscadorPersonasComponentComponent } from './modal-buscador-personas-component.component';

describe('ModalBuscadorPersonasComponentComponent', () => {
  let component: ModalBuscadorPersonasComponentComponent;
  let fixture: ComponentFixture<ModalBuscadorPersonasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBuscadorPersonasComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBuscadorPersonasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
