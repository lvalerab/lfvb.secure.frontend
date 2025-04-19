import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginComponentComponent } from './modal-login-component.component';

describe('ModalLoginComponentComponent', () => {
  let component: ModalLoginComponentComponent;
  let fixture: ComponentFixture<ModalLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLoginComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
