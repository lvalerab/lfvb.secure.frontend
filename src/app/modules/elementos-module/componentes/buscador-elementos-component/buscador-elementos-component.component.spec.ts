import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorElementosComponentComponent } from './buscador-elementos-component.component';

describe('BuscadorElementosComponentComponent', () => {
  let component: BuscadorElementosComponentComponent;
  let fixture: ComponentFixture<BuscadorElementosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorElementosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorElementosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
