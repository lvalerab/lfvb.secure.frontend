import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBusquedaPersonaComponentComponent } from './panel-busqueda-persona-component.component';

describe('PanelBusquedaPersonaComponentComponent', () => {
  let component: PanelBusquedaPersonaComponentComponent;
  let fixture: ComponentFixture<PanelBusquedaPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelBusquedaPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelBusquedaPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
