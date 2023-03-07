import { InternalDataService } from 'src/app/internal-data.service';
import { SignupService } from './../../signup.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    protected router: Router,
    protected formBuilder: FormBuilder,
    protected service: SignupService,
    protected internal: InternalDataService
  ) {}

  protected pass: any;
  protected cpass: any;
  protected flag: boolean = false;

  protected name: string = '';
  protected email: string = '';
  protected showErr: boolean = false;
  protected flagEmail: boolean = false;
  protected err: string = 'Invalid credentials';

  async ngOnInit() {
    if (this.internal.loggedin) {
      let promise = new Promise((resolve) => {
        this.service
          .putData(
            { ...this.internal.userData, loggedIn: false },
            this.internal.userData.id
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
      this.internal.loggedin = false;
      this.internal.userData = null;
    }
  }

  signupBuilder = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
    ],
    cpassword: ['', [Validators.required]],
  });

  gotoLogin() {
    this.router.navigate(['']);
  }

  equal() {
    console.log('Me aya');
    this.flag = this.pass != this.cpass;
  }
  closeErr() {
    this.showErr = false;
    this.err = '';
  }
  async valid() {
    this.flagEmail = false;
    let promise = new Promise((res) => {
      this.service.getData().subscribe((data) => {
        data.forEach((element) => {
          if (element.email == this.email) {
            this.flagEmail = true;
            this.showErr = true;
            console.log(this.flagEmail);
            this.err =
              'User Id with this email-id already exists,Please try to login';
          }
        });
        res('Done');
      });
    });
    let result = await promise;
    if (
      !this.flagEmail &&
      this.signupBuilder.get('name')?.valid &&
      this.signupBuilder.get('email')?.valid &&
      this.signupBuilder.get('password')?.valid &&
      this.signupBuilder.get('cpassword')?.valid &&
      this.pass == this.cpass
    ) {
      const data = {
        name: this.name,
        email: this.email,
        password: this.pass,
        quizAttended: [false, false, false, false, false],
        quizScore: [0, 0, 0, 0, 0],
        title: 'Beginner',
        loggedIn: false,
      };
      this.service.postData(data).subscribe(
        (res) => {
          alert('Signed up successfully, Login to continue');
          this.router.navigate(['']);
        },
        (err) => {
          this.showErr = true;
          this.err = 'Server down';
        }
      );
      //Navigate
    } else {
      if (!this.flagEmail) {
        this.showErr = true;
        if (this.signupBuilder.get('name')?.invalid) {
          this.err =
            'Please enter valid name, length should be between 3 to 25';
        } else if (this.signupBuilder.get('email')?.invalid) {
          this.err = 'Please enter valid email id';
        } else if (this.signupBuilder.get('password')?.invalid) {
          this.err = 'Please enter valid password, length between 6 to 15';
        } else if ((this.pass! = this.cpass)) {
          this.err = "Passwords does't match";
        } else this.err = 'Please enter valid credentials';
      }
    }
  }
}
