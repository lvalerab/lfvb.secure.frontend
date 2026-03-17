import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCallejeroComponentComponent } from './mantenimiento-callejero-component.component';

describe('MantenimientoCallejeroComponentComponent', () => {
  let component: MantenimientoCallejeroComponentComponent;
  let fixture: ComponentFixture<MantenimientoCallejeroComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoCallejeroComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoCallejeroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
