import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C404NotFoundComponentComponent } from './c404-not-found-component.component';

describe('C404NotFoundComponentComponent', () => {
  let component: C404NotFoundComponentComponent;
  let fixture: ComponentFixture<C404NotFoundComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [C404NotFoundComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(C404NotFoundComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
