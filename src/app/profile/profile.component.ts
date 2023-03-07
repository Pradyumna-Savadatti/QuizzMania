import { Router } from '@angular/router';
import { InternalDataService } from './../internal-data.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  protected score: number = 0;
  protected quizzAttended: number = 0;
  protected highScore: number = 0;
  constructor(
    protected service: InternalDataService,
    protected location: Router
  ) {}
  ngOnInit() {
    if (!this.service.loggedin) {
      this.location.navigate(['']);
    }
    this.service.userData.quizScore.forEach((element: number) => {
      this.score += element;
      if (this.highScore < element) {
        this.highScore = element;
      }
    });
    this.service.userData.quizAttended.forEach((element: number) => {
      if (element) this.quizzAttended++;
    });
    this.score = this.score / this.quizzAttended;
  }
  goBack() {
    this.location.navigate(['main']);
  }
}
