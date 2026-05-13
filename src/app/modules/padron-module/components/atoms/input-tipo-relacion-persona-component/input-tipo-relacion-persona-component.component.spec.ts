import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTipoRelacionPersonaComponentComponent } from './input-tipo-relacion-persona-component.component';

describe('InputTipoRelacionPersonaComponentComponent', () => {
  let component: InputTipoRelacionPersonaComponentComponent;
  let fixture: ComponentFixture<InputTipoRelacionPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTipoRelacionPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTipoRelacionPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
