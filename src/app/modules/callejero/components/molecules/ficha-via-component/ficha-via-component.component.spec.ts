import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaViaComponentComponent } from './ficha-via-component.component';

describe('FichaViaComponentComponent', () => {
  let component: FichaViaComponentComponent;
  let fixture: ComponentFixture<FichaViaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaViaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaViaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
