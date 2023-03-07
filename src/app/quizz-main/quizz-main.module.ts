import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzMainComponent } from './quizz-main/quizz-main.component';

@NgModule({
  declarations: [QuizzMainComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class QuizzMainModule {}
