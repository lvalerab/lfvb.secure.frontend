import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTramiteComponentComponent } from './ficha-tramite-component.component';

describe('FichaTramiteComponentComponent', () => {
  let component: FichaTramiteComponentComponent;
  let fixture: ComponentFixture<FichaTramiteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaTramiteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaTramiteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
