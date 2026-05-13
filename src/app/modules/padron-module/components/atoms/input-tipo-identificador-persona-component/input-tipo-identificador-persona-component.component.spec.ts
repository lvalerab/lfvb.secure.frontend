import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTipoIdentificadorPersonaComponentComponent } from './input-tipo-identificador-persona-component.component';

describe('InputTipoIdentificadorPersonaComponentComponent', () => {
  let component: InputTipoIdentificadorPersonaComponentComponent;
  let fixture: ComponentFixture<InputTipoIdentificadorPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTipoIdentificadorPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTipoIdentificadorPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
