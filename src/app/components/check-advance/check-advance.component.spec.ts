import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAdvanceComponent } from './check-advance.component';

describe('CheckAdvanceComponent', () => {
  let component: CheckAdvanceComponent;
  let fixture: ComponentFixture<CheckAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckAdvanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
