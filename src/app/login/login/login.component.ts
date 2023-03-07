import { InternalDataService } from './../../internal-data.service';
import { SignupService } from './../../signup.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    protected service: SignupService,
    protected router: Router,
    protected formBuilder: FormBuilder,
    protected userService: InternalDataService
  ) {}

  protected email: string = '';
  protected password: string = '';
  protected data: any;
  protected showErr: boolean = false;
  protected err: string = 'Invalid credentials';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  closeErr() {
    this.showErr = false;
    this.err = '';
  }

  async ngOnInit() {
    if (this.userService.loggedin) {
      console.log(this.userService);
      let promise = new Promise((resolve) => {
        this.userService.userData.loggedIn = false;
        this.service
          .putData(this.userService.userData, this.userService.userData.id)
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
      this.userService.loggedin = false;
      this.userService.userData = null;
    }
  }

  async validate() {
    let flag = false;
    let promise = new Promise((res) => {
      this.service.getData().subscribe(
        (data) => {
          this.data = data;
          this.data.forEach(async (dt: any) => {
            if (dt.email == this.email && dt.password == this.password) {
              let promise2 = new Promise((reso) => {
                dt.loggedIn = true;
                this.service.putData(dt, dt.id).subscribe(
                  (param: any) => {
                    reso('');
                  },
                  (err: any) => {
                    err();
                  }
                );
                reso('');
              });
              await promise2;
              flag = true;
              this.userService.loggedin = true;
              this.userService.userData = { ...dt };
              console.log(dt);
              this.router.navigate(['main']);
            }
          });
          res('Done!');
        },
        (err) => {
          res('Done!');
        }
      );
    });
    let result = await promise;
    if (!flag) {
      console.log(flag);
      this.showErr = true;
      this.err = 'Invalid credentials';
    }
  }

  gotoSignUp() {
    this.router.navigate(['signup']);
  }
}
