import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyInvitesComponent } from './my-invites.component';

describe('MyInvitesComponent', () => {
  let component: MyInvitesComponent;
  let fixture: ComponentFixture<MyInvitesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
