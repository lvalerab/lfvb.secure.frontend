import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPasosTablaComponent } from './vista-pasos-tabla.component';

describe('VistaPasosTablaComponent', () => {
  let component: VistaPasosTablaComponent;
  let fixture: ComponentFixture<VistaPasosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaPasosTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPasosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
