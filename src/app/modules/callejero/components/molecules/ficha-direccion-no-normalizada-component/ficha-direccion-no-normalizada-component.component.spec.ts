import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDireccionNoNormalizadaComponentComponent } from './ficha-direccion-no-normalizada-component.component';

describe('FichaDireccionNoNormalizadaComponentComponent', () => {
  let component: FichaDireccionNoNormalizadaComponentComponent;
  let fixture: ComponentFixture<FichaDireccionNoNormalizadaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaDireccionNoNormalizadaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDireccionNoNormalizadaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
