import { IuserCred } from './iuserCred';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(protected http: HttpClient) {}
  protected _url = 'http://localhost:3000/user_cred';
  postData(data: any): Observable<IuserCred[]> {
    return this.http.post<IuserCred[]>(this._url, data).pipe(
      catchError((e: any): Observable<IuserCred[]> => {
        return this.handleError(e);
      })
    );
  }
  getData(): Observable<IuserCred[]> {
    return this.http.get<IuserCred[]>(this._url).pipe(
      catchError((e: any): Observable<IuserCred[]> => {
        return this.handleError(e);
      })
    );
  }
  // putData2(id: any, data: any): Observable<any> {
  //   this._purl = this._url + `/${id}`;
  //   return this.http.put<IEmployee[]>(this._purl, data).pipe(
  //     catchError((e) => {
  //       return this.handleError(e);
  //     })
  //   );
  // }
  putData(data: any, id: number): Observable<IuserCred[]> {
    let _putUrl = this._url + `/${id}`;
    console.log('putData => ', data, id, _putUrl);
    return this.http.put<IuserCred[]>(_putUrl, data).pipe(
      catchError((e: any) => {
        return this.handleError(e);
      })
    );
  }
  handleError(e: HttpErrorResponse): Observable<IuserCred[]> {
    return throwError(e);
  }
}
