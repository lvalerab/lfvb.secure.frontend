import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGruposPermisosComponent } from './listado-grupos-permisos.component';

describe('ListadoGruposPermisosComponent', () => {
  let component: ListadoGruposPermisosComponent;
  let fixture: ComponentFixture<ListadoGruposPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoGruposPermisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGruposPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
