import { IQuetion } from './../../iquetion';
import { QuetionProviderService } from './../../quetion-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { SignupService } from 'src/app/signup.service';
import { InternalDataService } from 'src/app/internal-data.service';

@Component({
  selector: 'app-quizz-main',
  templateUrl: './quizz-main.component.html',
  styleUrls: ['./quizz-main.component.scss'],
})
export class QuizzMainComponent {
  constructor(
    protected route: ActivatedRoute,
    protected service: QuetionProviderService,
    protected router: Router,
    protected signService: SignupService,
    protected internal: InternalDataService
  ) {}
  protected data: any;
  protected num: number = 1;
  protected timeMin: number = 0;
  protected timeSec: number = 0;
  protected id: number = 0;
  protected quetionsAttended: number = 0;
  protected ans: number[] = [];
  protected over: boolean = false;
  protected ansCount = 0;
  protected timeCount = 10;
  protected tim: any;
  protected title: string = '';

  async ngOnInit() {
    if (!this.internal.loggedin) {
      this.router.navigate(['']);
    }
    this.timeMin = 1;
    this.timeSec = 10;
    let promise = new Promise((resolve) => {
      this.route.params.subscribe(async (params) => {
        this.id = params['id'];
        if (this.internal.userData.quizAttended[this.id]) {
          this.router.navigate(['main']);
        }
        let fromService = this.service.getQuetions();
        let promise2 = new Promise((resolve2) => {
          fromService.subscribe((data) => {
            resolve2(data[this.id]);
          });
        });
        let data = await promise2;

        resolve(data);
      });
    });
    this.data = await promise;
    let time = setInterval(async () => {
      this.timeSec--;
      if (this.timeSec == 0) {
        if (this.timeMin == 0) {
          clearInterval(time);
          this.submitSol();
        } else {
          this.timeMin--;
          this.timeSec = 59;
        }
      }
    }, 1000);
  }
  answered(i: any, j: any) {
    this.quetionsAttended++;
    this.ans[i] = j;
  }
  async submitSol() {
    this.ansCount = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].ans == this.ans[i]) {
        this.ansCount++;
      }
    }
    let promise = new Promise((resolve) => {
      this.internal.userData.quizAttended[this.id] = true;
      let newData = this.internal.userData;
      this.signService.putData(newData, this.internal.userData.id).subscribe(
        (res) => {
          resolve('');
        },
        (err) => {
          alert(err);
        }
      );
    });
    await promise;
    let promise2 = new Promise((resolve) => {
      let newData2 = this.internal.userData;
      console.log(this.ansCount);
      newData2.quizScore[this.id] = (this.ansCount / 10) * 100;
      this.signService.putData(newData2, this.internal.userData.id).subscribe(
        (res) => {
          resolve('');
        },
        (err) => {
          alert(err);
        }
      );
    });
    await promise2;

    let score = 0;
    let c = 0;
    for (let i = 0; i < this.internal.userData.quizAttended.length; i++) {
      if (this.internal.userData.quizAttended[i]) {
        c++;
        score += this.internal.userData.quizScore[i];
      }
    }
    score = score / 5;

    if (c == 1 && score > 69) {
      this.title = 'Bronze Buddy';
    } else if (c == 2 && score > 69) {
      this.title = 'Mr. Silver';
    } else if (c == 3 && score > 69) {
      this.title = 'GoldMan';
    } else if (c == 4 && score > 69) {
      this.title = 'Pro Platinum';
    } else if (c == 5 && score > 69) {
      this.title = 'Legend';
    } else {
      this.title = 'Beginner';
    }

    let promise3 = new Promise((res) => {
      this.internal.userData.title = this.title;
      this.signService
        .putData(this.internal.userData, this.internal.userData.id)
        .subscribe((param) => {
          res('');
        });
    });
    await promise3;
    this.over = true;
    this.tim = setInterval(() => {
      this.timeCount--;
      if (this.timeCount == 0) {
        clearInterval(this.tim);
        this.go();
      }
    }, 1000);
  }
  go() {
    clearInterval(this.tim);
    this.router.navigate(['main']);
  }
}
