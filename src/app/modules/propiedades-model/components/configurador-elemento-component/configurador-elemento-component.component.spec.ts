import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguradorElementoComponentComponent } from './configurador-elemento-component.component';

describe('ConfiguradorElementoComponentComponent', () => {
  let component: ConfiguradorElementoComponentComponent;
  let fixture: ComponentFixture<ConfiguradorElementoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguradorElementoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguradorElementoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
