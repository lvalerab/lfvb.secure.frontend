import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionTiposEntidadesModalComponent } from './administracion-tipos-entidades-modal.component';

describe('AdministracionTiposEntidadesModalComponent', () => {
  let component: AdministracionTiposEntidadesModalComponent;
  let fixture: ComponentFixture<AdministracionTiposEntidadesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministracionTiposEntidadesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionTiposEntidadesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
