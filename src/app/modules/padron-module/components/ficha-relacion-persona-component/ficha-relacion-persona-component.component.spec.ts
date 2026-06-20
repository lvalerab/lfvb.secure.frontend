import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaRelacionPersonaComponentComponent } from './ficha-relacion-persona-component.component';

describe('FichaRelacionPersonaComponentComponent', () => {
  let component: FichaRelacionPersonaComponentComponent;
  let fixture: ComponentFixture<FichaRelacionPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaRelacionPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaRelacionPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
