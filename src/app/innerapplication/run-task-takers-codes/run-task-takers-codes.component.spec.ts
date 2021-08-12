import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTaskTakersCodesComponent } from './run-task-takers-codes.component';

describe('RunTaskTakersCodesComponent', () => {
  let component: RunTaskTakersCodesComponent;
  let fixture: ComponentFixture<RunTaskTakersCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunTaskTakersCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTaskTakersCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
