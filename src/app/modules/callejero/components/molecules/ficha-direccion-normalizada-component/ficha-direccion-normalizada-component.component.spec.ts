import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDireccionNormalizadaComponentComponent } from './ficha-direccion-normalizada-component.component';

describe('FichaDireccionNormalizadaComponentComponent', () => {
  let component: FichaDireccionNormalizadaComponentComponent;
  let fixture: ComponentFixture<FichaDireccionNormalizadaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaDireccionNormalizadaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDireccionNormalizadaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
