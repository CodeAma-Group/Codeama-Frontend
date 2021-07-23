import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraskedComponent } from './userasked.component';

describe('UseraskedComponent', () => {
  let component: UseraskedComponent;
  let fixture: ComponentFixture<UseraskedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraskedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
