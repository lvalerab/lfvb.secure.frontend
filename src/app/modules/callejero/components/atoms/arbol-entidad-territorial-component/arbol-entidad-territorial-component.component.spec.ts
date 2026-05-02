import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolEntidadTerritorialComponentComponent } from './arbol-entidad-territorial-component.component';

describe('ArbolEntidadTerritorialComponentComponent', () => {
  let component: ArbolEntidadTerritorialComponentComponent;
  let fixture: ComponentFixture<ArbolEntidadTerritorialComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbolEntidadTerritorialComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbolEntidadTerritorialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
