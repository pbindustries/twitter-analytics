import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../config/app.config';
import {Tweeter} from './tweeter.model';
import {catchError, tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../core/shared/logger.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TweeterService {
  private tweetersUrl: string;
  private translations: any;

  static checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  constructor(private http: HttpClient,
              private translateService: TranslateService,
              private snackBar: MatSnackBar) {

    this.translateService.get(['tweeterCreated', 'saved', 'tweeterFollowerMaximum', 'tweeterRemoved'], {
      'value': AppConfig.votesLimit
    }).subscribe((texts) => {
      this.translations = texts;
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTweeters(): Observable<Tweeter[]> {
    return this.http.get<Tweeter[]>(this.tweetersUrl)
      .pipe(
        tap(tweeters => LoggerService.log(`fetched tweeters`)),
        catchError(this.handleError('getTweeters', []))
      );
  }

  getTweeterById(id: string): Observable<Tweeter> {
    const url = `${this.tweetersUrl}/${id}`;
    return this.http.get<Tweeter>(url).pipe(
      tap(() => LoggerService.log(`fetched tweeter id=${id}`)),
      catchError(this.handleError<Tweeter>(`getTweeter id=${id}`))
    );
  }

  createTweeter(tweeter: Tweeter): Observable<Tweeter> {
    return this.http.post<Tweeter>(this.tweetersUrl, JSON.stringify({
      name: tweeter.name,
      handle: tweeter.handle
    }), httpOptions).pipe(
      tap((tweeterSaved: Tweeter) => {
        LoggerService.log(`added tweeter w/ id=${tweeterSaved.id}`);
        this.showSnackBar('tweeterCreated');
      }),
      catchError(this.handleError<Tweeter>('addTweeter'))
    );
  }

  deleteTweeterById(id: any): Observable<Array<Tweeter>> {
    const url = `${this.tweetersUrl}/${id}`;

    return this.http.delete<Array<Tweeter>>(url, httpOptions).pipe(
      tap(() => LoggerService.log(`deleted tweeter id=${id}`)),
      catchError(this.handleError<Array<Tweeter>>('deleteTweeter'))
    );
  }

  follow(tweeter: Tweeter) {
    if (TweeterService.checkIfUserCanVote()) {
      const url = `${this.tweetersUrl}/${tweeter.id}/follow`;
      return this.http
        .post(url, {}, httpOptions)
        .pipe(
          tap(() => {
            LoggerService.log(`updated tweeter id=${tweeter.id}`);
            localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
            tweeter.followers += 1;
            this.showSnackBar('saved');
          }),
          catchError(this.handleError<any>('updateTweeter'))
        );
    } else {
      this.showSnackBar('tweeterFollowerMaximum');
      return observableThrowError('maximum votes');
    }
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
