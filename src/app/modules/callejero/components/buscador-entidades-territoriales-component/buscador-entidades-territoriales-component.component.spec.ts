import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEntidadesTerritorialesComponentComponent } from './buscador-entidades-territoriales-component.component';

describe('BuscadorEntidadesTerritorialesComponentComponent', () => {
  let component: BuscadorEntidadesTerritorialesComponentComponent;
  let fixture: ComponentFixture<BuscadorEntidadesTerritorialesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEntidadesTerritorialesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorEntidadesTerritorialesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
