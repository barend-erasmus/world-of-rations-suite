import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationGroupRouteComponent } from './ration-group-route.component';

describe('RationGroupRouteComponent', () => {
  let component: RationGroupRouteComponent;
  let fixture: ComponentFixture<RationGroupRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationGroupRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationGroupRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
