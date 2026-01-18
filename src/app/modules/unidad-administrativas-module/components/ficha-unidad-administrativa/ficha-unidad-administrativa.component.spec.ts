import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaUnidadAdministrativaComponent } from './ficha-unidad-administrativa.component';

describe('FichaUnidadAdministrativaComponent', () => {
  let component: FichaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<FichaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaUnidadAdministrativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
