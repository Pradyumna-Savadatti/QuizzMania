import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalDataService {
  public loggedin: boolean = false;
  public userData: any = {
    name: 'Pradyumna Pramod S',
    email: 'pradyumna@gmail.com',
    password: 'Pps@12',
    quizAttended: [true, true, true, true, true],
    quizScore: [20, 100, 40, 100, 60],
    title: 'Beginner',
    loggedIn: true,
    id: 1,
  };

  constructor() {}
}
