import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSituacionPersonaComponentComponent } from './ficha-situacion-persona-component.component';

describe('FichaSituacionPersonaComponentComponent', () => {
  let component: FichaSituacionPersonaComponentComponent;
  let fixture: ComponentFixture<FichaSituacionPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaSituacionPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaSituacionPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
