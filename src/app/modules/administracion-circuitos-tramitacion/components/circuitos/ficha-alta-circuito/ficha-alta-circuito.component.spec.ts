import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAltaCircuitoComponent } from './ficha-alta-circuito.component';

describe('FichaAltaCircuitoComponent', () => {
  let component: FichaAltaCircuitoComponent;
  let fixture: ComponentFixture<FichaAltaCircuitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaAltaCircuitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAltaCircuitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
