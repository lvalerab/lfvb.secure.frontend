import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaDireccionComponentComponent } from './ficha-direccion-component.component';

describe('FichaDireccionComponentComponent', () => {
  let component: FichaDireccionComponentComponent;
  let fixture: ComponentFixture<FichaDireccionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaDireccionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaDireccionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
