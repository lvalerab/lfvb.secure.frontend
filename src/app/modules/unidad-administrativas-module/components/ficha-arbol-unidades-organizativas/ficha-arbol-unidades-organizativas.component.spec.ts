import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaArbolUnidadesOrganizativasComponent } from './ficha-arbol-unidades-organizativas.component';

describe('FichaArbolUnidadesOrganizativasComponent', () => {
  let component: FichaArbolUnidadesOrganizativasComponent;
  let fixture: ComponentFixture<FichaArbolUnidadesOrganizativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaArbolUnidadesOrganizativasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaArbolUnidadesOrganizativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
