import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleoutletComponent } from './moduleoutlet.component';

describe('ModuleoutletComponent', () => {
  let component: ModuleoutletComponent;
  let fixture: ComponentFixture<ModuleoutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleoutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
