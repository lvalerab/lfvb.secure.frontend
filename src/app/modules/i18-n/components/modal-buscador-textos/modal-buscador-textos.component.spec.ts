import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuscadorTextosComponent } from './modal-buscador-textos.component';

describe('ModalBuscadorTextosComponent', () => {
  let component: ModalBuscadorTextosComponent;
  let fixture: ComponentFixture<ModalBuscadorTextosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBuscadorTextosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBuscadorTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
