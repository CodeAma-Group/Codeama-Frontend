import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmaItemComponent } from './ama-item.component';

describe('AmaItemComponent', () => {
  let component: AmaItemComponent;
  let fixture: ComponentFixture<AmaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
