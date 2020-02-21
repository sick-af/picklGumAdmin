import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleImageUploadComponent } from './multiple-image-upload.component';

describe('MultipleImageUploadComponent', () => {
  let component: MultipleImageUploadComponent;
  let fixture: ComponentFixture<MultipleImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
