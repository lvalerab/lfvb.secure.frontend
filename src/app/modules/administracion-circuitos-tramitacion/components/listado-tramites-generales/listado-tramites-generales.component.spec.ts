import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTramitesGeneralesComponent } from './listado-tramites-generales.component';

describe('ListadoTramitesGeneralesComponent', () => {
  let component: ListadoTramitesGeneralesComponent;
  let fixture: ComponentFixture<ListadoTramitesGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoTramitesGeneralesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTramitesGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
