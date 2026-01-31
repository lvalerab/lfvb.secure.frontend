import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUnidadesAdministrativasComponent } from './tabla-unidades-administrativas.component';

describe('TablaUnidadesAdministrativasComponent', () => {
  let component: TablaUnidadesAdministrativasComponent;
  let fixture: ComponentFixture<TablaUnidadesAdministrativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaUnidadesAdministrativasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaUnidadesAdministrativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
