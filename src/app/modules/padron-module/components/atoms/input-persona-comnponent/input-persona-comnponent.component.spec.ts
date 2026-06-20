import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPersonaComnponentComponent } from './input-persona-comnponent.component';

describe('InputPersonaComnponentComponent', () => {
  let component: InputPersonaComnponentComponent;
  let fixture: ComponentFixture<InputPersonaComnponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPersonaComnponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPersonaComnponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
