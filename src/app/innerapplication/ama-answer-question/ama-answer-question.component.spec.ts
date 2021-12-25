import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmaAnswerQuestionComponent } from './ama-answer-question.component';

describe('AmaAnswerQuestionComponent', () => {
  let component: AmaAnswerQuestionComponent;
  let fixture: ComponentFixture<AmaAnswerQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmaAnswerQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmaAnswerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
