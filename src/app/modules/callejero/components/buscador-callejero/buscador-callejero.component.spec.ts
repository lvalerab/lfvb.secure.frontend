import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCallejeroComponent } from './buscador-callejero.component';

describe('BuscadorCallejeroComponent', () => {
  let component: BuscadorCallejeroComponent;
  let fixture: ComponentFixture<BuscadorCallejeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCallejeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorCallejeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
