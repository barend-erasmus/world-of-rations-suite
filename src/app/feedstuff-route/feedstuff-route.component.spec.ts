import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedstuffRouteComponent } from './feedstuff-route.component';

describe('FeedstuffRouteComponent', () => {
  let component: FeedstuffRouteComponent;
  let fixture: ComponentFixture<FeedstuffRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedstuffRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedstuffRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
