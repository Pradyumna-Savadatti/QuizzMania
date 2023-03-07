import { QuizzMenuModule } from './quizz-menu/quizz-menu.module';
import { QuizzMainModule } from './quizz-main/quizz-main.module';
import { ProfileModule } from './profile/profile.module';
import { MainModule } from './main/main.module';
import { PnfModule } from './pnf/pnf.module';
import { PnfComponent } from './pnf/pnf/pnf.component';
import { SignupModule } from './signup/signup.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    SignupModule,
    PnfModule,
    MainModule,
    ProfileModule,
    QuizzMainModule,
    QuizzMenuModule,

    // MatFormFieldModule,
    // FormsModule,
    // MatInputModule,
    // MatButtonModule,
    // MatIconModule,
    // ReactiveFormsModule,

    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
