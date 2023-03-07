import { QuizzMainComponent } from './quizz-main/quizz-main/quizz-main.component';
import { QuizzMenuComponent } from './quizz-menu/quizz-menu/quizz-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { PnfComponent } from './pnf/pnf/pnf.component';
import { MainComponent } from './main/main/main.component';
import { SignupComponent } from './signup/signup/signup.component';
import { LoginComponent } from './login/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'main', component: MainComponent },
  {
    path: 'quizz-menu',
    component: QuizzMenuComponent,
  },
  {
    path: 'quizz/:id',
    component: QuizzMainComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: '**', component: PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
