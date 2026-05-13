import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTipoSituacionPersonaComponentComponent } from './input-tipo-situacion-persona-component.component';

describe('InputTipoSituacionPersonaComponentComponent', () => {
  let component: InputTipoSituacionPersonaComponentComponent;
  let fixture: ComponentFixture<InputTipoSituacionPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTipoSituacionPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTipoSituacionPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
