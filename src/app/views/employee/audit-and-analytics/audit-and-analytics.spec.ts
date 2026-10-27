import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAndAnalytics } from './audit-and-analytics';

describe('AuditAndAnalytics', () => {
  let component: AuditAndAnalytics;
  let fixture: ComponentFixture<AuditAndAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditAndAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditAndAnalytics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
