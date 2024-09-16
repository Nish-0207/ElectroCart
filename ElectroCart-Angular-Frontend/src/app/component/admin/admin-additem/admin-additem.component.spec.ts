import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdditemComponent } from './admin-additem.component';

describe('AdminAdditemComponent', () => {
  let component: AdminAdditemComponent;
  let fixture: ComponentFixture<AdminAdditemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAdditemComponent]
    });
    fixture = TestBed.createComponent(AdminAdditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
