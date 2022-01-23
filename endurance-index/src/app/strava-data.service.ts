import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Activity } from './model/activity';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root',
})
export class StravaDataService {
  activities: Array<Activity>;

  public refresh_token = 'e5c7b025d8b3841489b9a741eb03ceed94b075af';
  public access_token = 'no value';

  public client_id = 73837;
  public client_secret = '77f492b5ca6be20b52e95eb20def21a86a9de867';
  public grant_type = 'refresh_token';

  public oauthUrl = 'https://www.strava.com/api/v3/oauth/token?';
  public activitiesUrl = 'https://www.strava.com/api/v3/athlete/activities?';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.activities = new Array<Activity>();
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StravaDataService: ${message}`);
  }
  getActivities(): Observable<Activity[]> {
    const getUrl = this.activitiesUrl + 'access_token=' + this.access_token;
    console.log('GET : ' + getUrl);
    return this.http
      .get<Activity[]>(getUrl)
      .pipe(catchError(this.handleError<Activity[]>('getActivities', [])));
  }

  refreshToken(): Observable<Token> {
    const body = {};
    const url =
      this.oauthUrl +
      'client_id=' +
      this.client_id +
      '&client_secret=' +
      this.client_secret +
      '&grant_type=' +
      this.grant_type +
      '&refresh_token=' +
      this.refresh_token;
    console.log(url);
    return this.http
      .post<Token>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<Token>('refreshToken')));
  }
  computeEnduranceIndex(): void {
    this.activities.forEach((activity) => activity.computeEnduranceIndex());
    console.log(this.activities);
  }
  getEnduranceIndexes(): Array<number> {
    let tab = new Array<number>();
    this.activities.forEach((act) => tab.push(act.endurance_index));
    return tab;
  }
  getActivitiesDates(): Array<string> {
    let tab = new Array<string>();
    this.activities.forEach((act) => tab.push(act.start_date));
    return tab;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
