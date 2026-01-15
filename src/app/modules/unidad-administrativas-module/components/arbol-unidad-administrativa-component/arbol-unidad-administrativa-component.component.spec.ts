import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolUnidadAdministrativaComponentComponent } from './arbol-unidad-administrativa-component.component';

describe('ArbolUnidadAdministrativaComponentComponent', () => {
  let component: ArbolUnidadAdministrativaComponentComponent;
  let fixture: ComponentFixture<ArbolUnidadAdministrativaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbolUnidadAdministrativaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbolUnidadAdministrativaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
