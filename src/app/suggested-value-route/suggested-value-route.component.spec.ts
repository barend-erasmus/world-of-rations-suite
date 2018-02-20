import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedValueRouteComponent } from './suggested-value-route.component';

describe('SuggestedValueRouteComponent', () => {
  let component: SuggestedValueRouteComponent;
  let fixture: ComponentFixture<SuggestedValueRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedValueRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedValueRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
