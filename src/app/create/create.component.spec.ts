import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateHappeningsComponent } from './create.component';

describe('CreateHappeningsComponent', () => {
  let component: CreateHappeningsComponent;
  let fixture: ComponentFixture<CreateHappeningsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHappeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHappeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
