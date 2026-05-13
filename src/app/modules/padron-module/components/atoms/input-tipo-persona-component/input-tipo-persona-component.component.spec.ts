import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTipoPersonaComponentComponent } from './input-tipo-persona-component.component';

describe('InputTipoPersonaComponentComponent', () => {
  let component: InputTipoPersonaComponentComponent;
  let fixture: ComponentFixture<InputTipoPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTipoPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTipoPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
