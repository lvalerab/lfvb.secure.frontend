import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelIdentificadorPersonaComponentComponent } from './panel-identificador-persona-component.component';

describe('PanelIdentificadorPersonaComponentComponent', () => {
  let component: PanelIdentificadorPersonaComponentComponent;
  let fixture: ComponentFixture<PanelIdentificadorPersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelIdentificadorPersonaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelIdentificadorPersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
