import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzMenuComponent } from './quizz-menu/quizz-menu.component';

@NgModule({
  declarations: [QuizzMenuComponent],
  imports: [CommonModule, MatProgressBarModule],
})
export class QuizzMenuModule {}
