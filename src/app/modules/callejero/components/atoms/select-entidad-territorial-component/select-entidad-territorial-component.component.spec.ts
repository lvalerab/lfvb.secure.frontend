import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEntidadTerritorialComponentComponent } from './select-entidad-territorial-component.component';

describe('SelectEntidadTerritorialComponentComponent', () => {
  let component: SelectEntidadTerritorialComponentComponent;
  let fixture: ComponentFixture<SelectEntidadTerritorialComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectEntidadTerritorialComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEntidadTerritorialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
