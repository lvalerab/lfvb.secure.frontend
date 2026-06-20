import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LfvbInputComponentComponent } from './lfvb-input-component.component';

describe('LfvbInputComponentComponent', () => {
  let component: LfvbInputComponentComponent;
  let fixture: ComponentFixture<LfvbInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LfvbInputComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LfvbInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
