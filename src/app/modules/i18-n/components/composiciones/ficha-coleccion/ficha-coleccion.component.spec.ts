import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaColeccionComponent } from './ficha-coleccion.component';

describe('FichaColeccionComponent', () => {
  let component: FichaColeccionComponent;
  let fixture: ComponentFixture<FichaColeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaColeccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaColeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
