import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoIdiomasComponent } from './listado-idiomas.component';

describe('ListadoIdiomasComponent', () => {
  let component: ListadoIdiomasComponent;
  let fixture: ComponentFixture<ListadoIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoIdiomasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
