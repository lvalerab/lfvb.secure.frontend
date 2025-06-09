import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolGruposPermisosAplicacionComponentComponent } from './arbol-grupos-permisos-aplicacion-component.component';

describe('ArbolGruposPermisosAplicacionComponentComponent', () => {
  let component: ArbolGruposPermisosAplicacionComponentComponent;
  let fixture: ComponentFixture<ArbolGruposPermisosAplicacionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbolGruposPermisosAplicacionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbolGruposPermisosAplicacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
