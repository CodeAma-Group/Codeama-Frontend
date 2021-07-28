import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbugsolvedComponent } from './userbugsolved.component';

describe('UserbugsolvedComponent', () => {
  let component: UserbugsolvedComponent;
  let fixture: ComponentFixture<UserbugsolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbugsolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbugsolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
