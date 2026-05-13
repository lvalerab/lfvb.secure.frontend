import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSexoPersonaComponentComponent } from './input-sexo-persona-component.component';

describe('InputSexoPersonaComponentComponent', () => {
  let component: InputSexoPersonaComponentComponent;
  let fixture: ComponentFixture<InputSexoPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputSexoPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSexoPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
