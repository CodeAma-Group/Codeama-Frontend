import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskcodeamaComponent } from './askcodeama.component';

describe('AskcodeamaComponent', () => {
  let component: AskcodeamaComponent;
  let fixture: ComponentFixture<AskcodeamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskcodeamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskcodeamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
