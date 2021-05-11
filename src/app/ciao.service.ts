import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ciao } from './ciao';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class CiaoService {

  private ciaosUrl = 'api/ciaos';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET ciaos from the server */
  getCiaos(): Observable<Ciao[]> {
    return this.http.get<Ciao[]>(this.ciaosUrl)
      .pipe(
        tap(_ => this.log('fetched ciaos')),
        catchError(this.handleError<Ciao[]>('getCiaos', []))
      );
  }

  /** GET ciao by id. Return `undefined` when id not found */
  getCiaoNo404<Data>(id: number): Observable<Ciao> {
    const url = `${this.ciaosUrl}/?id=${id}`;
    return this.http.get<Ciao[]>(url)
      .pipe(
        map(ciaos => ciaos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} ciao id=${id}`);
        }),
        catchError(this.handleError<Ciao>(`getCiao id=${id}`))
      );
  }

  /** GET ciao by id. Will 404 if id not found */
  getCiao(id: number): Observable<Ciao> {
    const url = `${this.ciaosUrl}/${id}`;
    return this.http.get<Ciao>(url).pipe(
      tap(_ => this.log(`fetched ciao id=${id}`)),
      catchError(this.handleError<Ciao>(`getCiao id=${id}`))
    );
  }

  /* GET ciaos whose name contains search term */
  searchCiaos(term: string): Observable<Ciao[]> {
    if (!term.trim()) {
      // if not search term, return empty ciao array.
      return of([]);
    }
    return this.http.get<Ciao[]>(`${this.ciaosUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found ciaos matching "${term}"`) :
         this.log(`no ciaos matching "${term}"`)),
      catchError(this.handleError<Ciao[]>('searchCiaos', []))
    );
  }


  addCiao(ciao: Ciao): Observable<Ciao> {
    return this.http.post<Ciao>(this.ciaosUrl, ciao, this.httpOptions).pipe(
      tap((newCiao: Ciao) => this.log(`added ciao w/ id=${newCiao.id}`)),
      catchError(this.handleError<Ciao>('addCiao'))
    );
  }


  deleteCiao(id: number): Observable<Ciao> {
    const url = `${this.ciaosUrl}/${id}`;

    return this.http.delete<Ciao>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted ciao id=${id}`)),
      catchError(this.handleError<Ciao>('deleteCiao'))
    );
  }

  /** PUT: update the ciao on the server */
  updateCiao(ciao: Ciao): Observable<any> {
    return this.http.put(this.ciaosUrl, ciao, this.httpOptions).pipe(
      tap(_ => this.log(`updated ciao id=${ciao.id}`)),
      catchError(this.handleError<any>('updateCiao'))
    );
  }

  /**
   
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CiaoService: ${message}`);
  }
}

