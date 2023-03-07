import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzMenuComponent } from './quizz-menu.component';

describe('QuizzMenuComponent', () => {
  let component: QuizzMenuComponent;
  let fixture: ComponentFixture<QuizzMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
