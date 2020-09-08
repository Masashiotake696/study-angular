import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HandleError, HttpErrorHandlerService } from '../http-error-handler.service';
import { Hero } from './hero';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class HeroesService {
  heroesUrl = 'api/heroes';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandlerService: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandlerService.createHandleError('HeroesService');
  }

  // GET: Get heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // GET: Get heroes whose name contains search term
  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    // HttpParamsオブジェクトは不変なので、setメソッドの戻り値を使用する
    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Hero[]>(this.heroesUrl, options)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  // POST: Add a new hero to the database
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }

  // DELETE: Delete the hero from the database
  deleteHero(id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero', {}))
      );
  }

  // PUT: Update the hero on the database. Returns the updated hero upon success
  updateHero(hero: Hero): Observable<Hero> {
    // 古い認証トークンが切れた場合にトークンを更新することが可能
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }
}
