import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaTiempoPersonaComponentComponent } from './linea-tiempo-persona-component.component';

describe('LineaTiempoPersonaComponentComponent', () => {
  let component: LineaTiempoPersonaComponentComponent;
  let fixture: ComponentFixture<LineaTiempoPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineaTiempoPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaTiempoPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
