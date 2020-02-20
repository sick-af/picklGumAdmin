import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputFormComponent } from './reusable-input-form.component';

describe('ReusableInputFormComponent', () => {
  let component: ReusableInputFormComponent;
  let fixture: ComponentFixture<ReusableInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
