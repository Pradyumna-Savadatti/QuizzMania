import { IQuetion } from './iquetion';
import { throwError, catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuetionProviderService {
  constructor(protected http: HttpClient) {}
  protected _url = 'http://localhost:3000/quetions';
  getQuetions(): Observable<IQuetion[]> {
    return this.http.get<IQuetion[]>(this._url).pipe(
      catchError((e: any): Observable<IQuetion[]> => {
        return throwError(e);
      })
    );
  }
}
