import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesMassageComponent } from './notes-massage.component';

describe('NotesMassageComponent', () => {
  let component: NotesMassageComponent;
  let fixture: ComponentFixture<NotesMassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesMassageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesMassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
