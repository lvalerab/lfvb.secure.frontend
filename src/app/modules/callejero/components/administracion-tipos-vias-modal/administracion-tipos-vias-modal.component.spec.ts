import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionTiposViasModalComponent } from './administracion-tipos-vias-modal.component';

describe('AdministracionTiposViasModalComponent', () => {
  let component: AdministracionTiposViasModalComponent;
  let fixture: ComponentFixture<AdministracionTiposViasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministracionTiposViasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionTiposViasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
