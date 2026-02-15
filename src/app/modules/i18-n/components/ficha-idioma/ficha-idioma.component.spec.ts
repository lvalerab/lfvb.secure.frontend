import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaIdiomaComponent } from './ficha-idioma.component';

describe('FichaIdiomaComponent', () => {
  let component: FichaIdiomaComponent;
  let fixture: ComponentFixture<FichaIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaIdiomaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
