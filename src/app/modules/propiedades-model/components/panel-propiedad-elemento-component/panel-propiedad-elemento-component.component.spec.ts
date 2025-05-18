import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPropiedadElementoComponentComponent } from './panel-propiedad-elemento-component.component';

describe('PanelPropiedadElementoComponentComponent', () => {
  let component: PanelPropiedadElementoComponentComponent;
  let fixture: ComponentFixture<PanelPropiedadElementoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelPropiedadElementoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPropiedadElementoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
