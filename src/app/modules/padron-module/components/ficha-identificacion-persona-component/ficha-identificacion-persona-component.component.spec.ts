import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaIdentificacionPersonaComponentComponent } from './ficha-identificacion-persona-component.component';

describe('FichaIdentificacionPersonaComponentComponent', () => {
  let component: FichaIdentificacionPersonaComponentComponent;
  let fixture: ComponentFixture<FichaIdentificacionPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaIdentificacionPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaIdentificacionPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
