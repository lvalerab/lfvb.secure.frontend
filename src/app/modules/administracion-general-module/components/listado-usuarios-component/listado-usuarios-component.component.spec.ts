import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuariosComponentComponent } from './listado-usuarios-component.component';

describe('ListadoUsuariosComponentComponent', () => {
  let component: ListadoUsuariosComponentComponent;
  let fixture: ComponentFixture<ListadoUsuariosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoUsuariosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoUsuariosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
