import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTextosIdiomasComponent } from './editor-textos-idiomas.component';

describe('EditorTextosIdiomasComponent', () => {
  let component: EditorTextosIdiomasComponent;
  let fixture: ComponentFixture<EditorTextosIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorTextosIdiomasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorTextosIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
