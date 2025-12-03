import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPasoComponent } from './ficha-paso.component';

describe('FichaPasoComponent', () => {
  let component: FichaPasoComponent;
  let fixture: ComponentFixture<FichaPasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaPasoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaPasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
