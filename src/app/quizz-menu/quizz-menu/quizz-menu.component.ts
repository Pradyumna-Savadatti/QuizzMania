import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { InternalDataService } from 'src/app/internal-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quizz-menu',
  templateUrl: './quizz-menu.component.html',
  styleUrls: ['./quizz-menu.component.scss'],
})
export class QuizzMenuComponent {
  constructor(
    protected route: Router,
    protected internal: InternalDataService,
    private renderer: Renderer2,
    protected location: Location
  ) {}
  protected arr1: number[] = [];
  protected arr2: number[] = [];
  protected arr3: number[] = [0, 290, 215, 145, 75];
  protected myWheel: any;
  protected angle: number = 0;
  protected flag: boolean = false;
  protected time: number = 0;
  protected quizzGiven: number = 0;
  protected spinFlag: boolean = false;
  @ViewChild('subMain') sub: any;
  @ViewChild('pointer') point: any;
  ngOnInit() {
    if (!this.internal.loggedin) {
      this.route.navigate(['']);
    }
    for (let i = 0; i < this.internal.userData.quizAttended.length; i++) {
      if (this.internal.userData.quizAttended[i]) this.quizzGiven++;
    }

    console.log(this.quizzGiven);
    if (this.quizzGiven == 5) this.spinFlag = true;

    let radius = 15,
      x = 0;
    for (let i = 0; i < 360; i += 72) {
      this.arr1[x] = (1 - Math.sin((i * 3.142) / 180)) * radius;
      this.arr2[x++] = (1 - Math.cos((i * 3.142) / 180)) * radius;
    }
  }
  gotoQuizz(id: any) {
    this.route.navigate(['quizz', id]);
  }
  spin() {
    this.angle = Math.floor(((Math.random() * 100) % 50) / 10);
    console.log(this.angle, this.internal.userData.quizAttended[this.angle]);
    if (!this.internal.userData.quizAttended[this.angle]) {
      this.renderer.addClass(this.sub.nativeElement, `animate${this.angle}`);
      this.renderer.addClass(this.point.nativeElement, `pointerClass`);
      setTimeout(() => {
        this.flag = true;
        let timer = setInterval(() => {
          this.time++;
          if (this.time == 4) {
            clearInterval(timer);
            this.route.navigate(['quizz', this.angle]);
          }
        }, 800);
      }, 4000);
    } else {
      this.spin();
    }
  }
  goBack() {
    this.location.back();
  }
  gotoProfile() {
    this.route.navigate(['profile']);
  }
}
