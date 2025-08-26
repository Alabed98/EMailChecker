import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHandelComponent } from './error-handel.component';

describe('ErrorHandelComponent', () => {
  let component: ErrorHandelComponent;
  let fixture: ComponentFixture<ErrorHandelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorHandelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorHandelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
