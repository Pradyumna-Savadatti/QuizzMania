import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzMainComponent } from './quizz-main.component';

describe('QuizzMainComponent', () => {
  let component: QuizzMainComponent;
  let fixture: ComponentFixture<QuizzMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
