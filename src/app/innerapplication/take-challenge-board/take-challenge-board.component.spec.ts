import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeChallengeBoardComponent } from './take-challenge-board.component';

describe('TakeChallengeBoardComponent', () => {
  let component: TakeChallengeBoardComponent;
  let fixture: ComponentFixture<TakeChallengeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeChallengeBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeChallengeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
