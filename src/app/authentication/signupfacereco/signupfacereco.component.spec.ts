import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupfacerecoComponent } from './signupfacereco.component';

describe('SignupfacerecoComponent', () => {
  let component: SignupfacerecoComponent;
  let fixture: ComponentFixture<SignupfacerecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupfacerecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupfacerecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
