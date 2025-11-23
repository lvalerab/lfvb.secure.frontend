import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCircuitoComponentComponent } from './ficha-circuito-component.component';

describe('FichaCircuitoComponentComponent', () => {
  let component: FichaCircuitoComponentComponent;
  let fixture: ComponentFixture<FichaCircuitoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaCircuitoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaCircuitoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
