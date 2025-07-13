import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixeHtmlComponent } from './fixe-html.component';

describe('FixeHtmlComponent', () => {
  let component: FixeHtmlComponent;
  let fixture: ComponentFixture<FixeHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixeHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixeHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
