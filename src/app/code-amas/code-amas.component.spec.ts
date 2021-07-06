import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAmasComponent } from './code-amas.component';

describe('CodeAmasComponent', () => {
  let component: CodeAmasComponent;
  let fixture: ComponentFixture<CodeAmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeAmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeAmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
