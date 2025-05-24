import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAplicacionesComponentComponent } from './listado-aplicaciones-component.component';

describe('ListadoAplicacionesComponentComponent', () => {
  let component: ListadoAplicacionesComponentComponent;
  let fixture: ComponentFixture<ListadoAplicacionesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoAplicacionesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoAplicacionesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
