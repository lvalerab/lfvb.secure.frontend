import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPersonaComponentComponent } from './ficha-persona-component.component';

describe('FichaPersonaComponentComponent', () => {
  let component: FichaPersonaComponentComponent;
  let fixture: ComponentFixture<FichaPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
