import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationCreateRouteComponent } from './ration-create-route.component';

describe('RationCreateRouteComponent', () => {
  let component: RationCreateRouteComponent;
  let fixture: ComponentFixture<RationCreateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationCreateRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationCreateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
