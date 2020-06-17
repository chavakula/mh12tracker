import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionStatsComponent } from './infection-stats.component';

describe('InfectionStatsComponent', () => {
  let component: InfectionStatsComponent;
  let fixture: ComponentFixture<InfectionStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
