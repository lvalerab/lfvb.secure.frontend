import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPersonasComponentComponent } from './buscador-personas-component.component';

describe('BuscadorPersonasComponentComponent', () => {
  let component: BuscadorPersonasComponentComponent;
  let fixture: ComponentFixture<BuscadorPersonasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorPersonasComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorPersonasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
