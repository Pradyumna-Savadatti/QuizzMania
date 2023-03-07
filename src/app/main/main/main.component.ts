import { SignupService } from './../../signup.service';
import { InternalDataService } from './../../internal-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  protected data: any;
  constructor(
    protected route: Router,
    protected service: InternalDataService,
    protected signup: SignupService
  ) {}

  ngOnInit() {
    if (!this.service.loggedin) {
      this.route.navigate(['']);
    }
  }
  gotoProfile() {
    this.route.navigate(['profile']);
  }
  gotoQuizz() {
    this.route.navigate(['quizz-menu']);
  }
  async logout() {
    console.log(this.service.userData);
    let promise = new Promise((resolve) => {
      this.signup
        .putData(
          { ...this.service.userData, loggedIn: false },
          this.service.userData.id
        )
        .subscribe(
          (param) => {
            resolve('');
          },
          (err) => {
            err();
          }
        );
    });
    await promise;

    this.service.loggedin = false;
    this.service.userData = null;
    this.route.navigate(['']);
  }
}
