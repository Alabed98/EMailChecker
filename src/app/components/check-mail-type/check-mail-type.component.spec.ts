import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMailTypeComponent } from './check-mail-type.component';

describe('CheckMailTypeComponent', () => {
  let component: CheckMailTypeComponent;
  let fixture: ComponentFixture<CheckMailTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckMailTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckMailTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
