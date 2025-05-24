import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAplicacionComponentComponent } from './ficha-aplicacion-component.component';

describe('FichaAplicacionComponentComponent', () => {
  let component: FichaAplicacionComponentComponent;
  let fixture: ComponentFixture<FichaAplicacionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaAplicacionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAplicacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
