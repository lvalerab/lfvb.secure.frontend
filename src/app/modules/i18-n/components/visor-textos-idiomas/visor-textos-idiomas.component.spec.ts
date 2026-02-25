import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorTextosIdiomasComponent } from './visor-textos-idiomas.component';

describe('VisorTextosIdiomasComponent', () => {
  let component: VisorTextosIdiomasComponent;
  let fixture: ComponentFixture<VisorTextosIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisorTextosIdiomasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorTextosIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
