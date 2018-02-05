import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRouteComponent } from './billing-route.component';

describe('BillingRouteComponent', () => {
  let component: BillingRouteComponent;
  let fixture: ComponentFixture<BillingRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
