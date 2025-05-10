import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscadorElementosComponentComponent } from './modal-buscador-elementos-component.component';

describe('ModalBuscadorElementosComponentComponent', () => {
  let component: ModalBuscadorElementosComponentComponent;
  let fixture: ComponentFixture<ModalBuscadorElementosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBuscadorElementosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBuscadorElementosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
