import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcomponentComponent } from './testcomponent.component';

describe ('TestcomponentComponent', () => {
  let component: TestcomponentComponent;
  let fixture: ComponentFixture<TestcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
