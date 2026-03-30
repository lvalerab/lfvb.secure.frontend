import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEntidadTerritorialComponentComponent } from './ficha-entidad-territorial-component.component';

describe('FichaEntidadTerritorialComponentComponent', () => {
  let component: FichaEntidadTerritorialComponentComponent;
  let fixture: ComponentFixture<FichaEntidadTerritorialComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaEntidadTerritorialComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEntidadTerritorialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
