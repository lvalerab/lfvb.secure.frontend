import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTextosComponent } from './buscador-textos.component';

describe('BuscadorTextosComponent', () => {
  let component: BuscadorTextosComponent;
  let fixture: ComponentFixture<BuscadorTextosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTextosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
