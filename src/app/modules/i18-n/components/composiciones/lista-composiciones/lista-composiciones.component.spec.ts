import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComposicionesComponent } from './lista-composiciones.component';

describe('ListaComposicionesComponent', () => {
  let component: ListaComposicionesComponent;
  let fixture: ComponentFixture<ListaComposicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComposicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaComposicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
