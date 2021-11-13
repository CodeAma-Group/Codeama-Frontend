import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesBoxComponent } from './activities-box.component';

describe('ActivitiesBoxComponent', () => {
  let component: ActivitiesBoxComponent;
  let fixture: ComponentFixture<ActivitiesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
