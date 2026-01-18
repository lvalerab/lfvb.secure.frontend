import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAdminArbolUnidadesAdministrativasComponent } from './ficha-admin-arbol-unidades-administrativas.component';

describe('FichaAdminArbolUnidadesAdministrativasComponent', () => {
  let component: FichaAdminArbolUnidadesAdministrativasComponent;
  let fixture: ComponentFixture<FichaAdminArbolUnidadesAdministrativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaAdminArbolUnidadesAdministrativasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAdminArbolUnidadesAdministrativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
