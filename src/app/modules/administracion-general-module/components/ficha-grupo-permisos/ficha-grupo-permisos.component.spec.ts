import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaGrupoPermisosComponent } from './ficha-grupo-permisos.component';

describe('FichaGrupoPermisosComponent', () => {
  let component: FichaGrupoPermisosComponent;
  let fixture: ComponentFixture<FichaGrupoPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaGrupoPermisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaGrupoPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
