import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAdministracionCoreAplicacionComponent } from './ficha-administracion-core-aplicacion.component';

describe('FichaAdministracionCoreAplicacionComponent', () => {
  let component: FichaAdministracionCoreAplicacionComponent;
  let fixture: ComponentFixture<FichaAdministracionCoreAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaAdministracionCoreAplicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAdministracionCoreAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
