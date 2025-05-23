import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolSelectorPropiedadesComponentComponent } from './arbol-selector-propiedades-component.component';

describe('ArbolSelectorPropiedadesComponentComponent', () => {
  let component: ArbolSelectorPropiedadesComponentComponent;
  let fixture: ComponentFixture<ArbolSelectorPropiedadesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbolSelectorPropiedadesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbolSelectorPropiedadesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
