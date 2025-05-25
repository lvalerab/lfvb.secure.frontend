import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioActualComponent } from './modal-usuario-actual.component';

describe('ModalUsuarioActualComponent', () => {
  let component: ModalUsuarioActualComponent;
  let fixture: ComponentFixture<ModalUsuarioActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUsuarioActualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUsuarioActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
