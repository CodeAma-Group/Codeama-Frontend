import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfacerecoComponent } from './loginfacereco.component';

describe('LoginfacerecoComponent', () => {
  let component: LoginfacerecoComponent;
  let fixture: ComponentFixture<LoginfacerecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginfacerecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfacerecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
