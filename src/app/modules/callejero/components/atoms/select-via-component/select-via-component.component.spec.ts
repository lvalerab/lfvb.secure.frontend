import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectViaComponentComponent } from './select-via-component.component';

describe('SelectViaComponentComponent', () => {
  let component: SelectViaComponentComponent;
  let fixture: ComponentFixture<SelectViaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectViaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectViaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
