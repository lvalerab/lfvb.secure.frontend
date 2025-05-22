import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaUsuarioComponentComponent } from './ficha-usuario-component.component';

describe('FichaUsuarioComponentComponent', () => {
  let component: FichaUsuarioComponentComponent;
  let fixture: ComponentFixture<FichaUsuarioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaUsuarioComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaUsuarioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
