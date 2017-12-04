import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationGroupCreateRouteComponent } from './ration-group-create-route.component';

describe('RationGroupCreateRouteComponent', () => {
  let component: RationGroupCreateRouteComponent;
  let fixture: ComponentFixture<RationGroupCreateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationGroupCreateRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationGroupCreateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
