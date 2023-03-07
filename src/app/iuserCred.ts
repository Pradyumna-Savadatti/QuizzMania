export interface IuserCred {
  name: string;
  email: string;
  password: string;
  quizAttended: [false, false, false, false, false];
  quizScore: [0, 0, 0, 0, 0];
  title: String;
  loggedIn: boolean;
}
