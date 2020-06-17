import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunemapComponent } from './punemap.component';

describe('PunemapComponent', () => {
  let component: PunemapComponent;
  let fixture: ComponentFixture<PunemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
