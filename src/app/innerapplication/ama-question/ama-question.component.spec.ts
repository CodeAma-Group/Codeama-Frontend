import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmaQuestionComponent } from './ama-question.component';

describe('AmaQuestionComponent', () => {
  let component: AmaQuestionComponent;
  let fixture: ComponentFixture<AmaQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmaQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmaQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
