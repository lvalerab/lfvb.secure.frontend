import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecTiposEntidadesTerritorialesComponent } from './selec-tipos-entidades-territoriales.component';

describe('SelecTiposEntidadesTerritorialesComponent', () => {
  let component: SelecTiposEntidadesTerritorialesComponent;
  let fixture: ComponentFixture<SelecTiposEntidadesTerritorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelecTiposEntidadesTerritorialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecTiposEntidadesTerritorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
