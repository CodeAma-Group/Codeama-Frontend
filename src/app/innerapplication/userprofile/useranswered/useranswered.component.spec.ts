import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseransweredComponent } from './useranswered.component';

describe('UseransweredComponent', () => {
  let component: UseransweredComponent;
  let fixture: ComponentFixture<UseransweredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseransweredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseransweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
