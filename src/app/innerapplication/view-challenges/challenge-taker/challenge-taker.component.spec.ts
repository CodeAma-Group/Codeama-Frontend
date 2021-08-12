import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTakerComponent } from './challenge-taker.component';

describe('ChallengeTakerComponent', () => {
  let component: ChallengeTakerComponent;
  let fixture: ComponentFixture<ChallengeTakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeTakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
