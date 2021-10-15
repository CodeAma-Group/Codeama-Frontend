import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditBadgeComponent } from './app-edit-badge.component';

describe('AppEditBadgeComponent', () => {
  let component: AppEditBadgeComponent;
  let fixture: ComponentFixture<AppEditBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEditBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
