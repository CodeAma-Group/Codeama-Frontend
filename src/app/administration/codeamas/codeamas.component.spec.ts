import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeamasComponent } from './codeamas.component';

describe('CodeamasComponent', () => {
  let component: CodeamasComponent;
  let fixture: ComponentFixture<CodeamasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeamasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
