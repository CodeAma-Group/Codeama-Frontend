import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserresourcesComponent } from './userresources.component';

describe('UserresourcesComponent', () => {
  let component: UserresourcesComponent;
  let fixture: ComponentFixture<UserresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
