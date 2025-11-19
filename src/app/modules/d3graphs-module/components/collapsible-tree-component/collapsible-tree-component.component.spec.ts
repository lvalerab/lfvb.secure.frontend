import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleTreeComponentComponent } from './collapsible-tree-component.component';

describe('CollapsibleTreeComponentComponent', () => {
  let component: CollapsibleTreeComponentComponent;
  let fixture: ComponentFixture<CollapsibleTreeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollapsibleTreeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsibleTreeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
