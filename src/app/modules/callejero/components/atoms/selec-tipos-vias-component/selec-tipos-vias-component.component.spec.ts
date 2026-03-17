import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecTiposViasComponentComponent } from './selec-tipos-vias-component.component';

describe('SelecTiposViasComponentComponent', () => {
  let component: SelecTiposViasComponentComponent;
  let fixture: ComponentFixture<SelecTiposViasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelecTiposViasComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecTiposViasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
